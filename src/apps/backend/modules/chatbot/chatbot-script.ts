import * as readline from 'readline';

import { PromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';
import { LLMChain } from 'langchain/chains';
import { ConversationSummaryMemory } from 'langchain/memory';

import { ConfigService } from '../config';
import { Logger } from '../logger';

import ConversationRepository from './store/conversation-repository';
import { ConversationType } from './types';

// Initialize OpenAI and LangChain components
const llm = new ChatOpenAI({
  openAIApiKey: ConfigService.getValue('openai.apiKey'),
  modelName: 'gpt-3.5-turbo',
  temperature: 0.7,
});

// Create a separate chain for generating summaries
const summaryPrompt = PromptTemplate.fromTemplate(`
Summarize the following conversation, focusing on key points and context that might be important for future reference:

{conversation}

Concise summary:`);

const summaryChain = new LLMChain({
  llm,
  prompt: summaryPrompt,
});

// Create memory instance
const memory = new ConversationSummaryMemory({
  llm,
  memoryKey: 'chat_history',
  inputKey: 'input',
});

// Define conversation prompt template
const prompt = PromptTemplate.fromTemplate(`
Context from previous conversations:
{chat_history}

Current message: {input}

Please provide a helpful and relevant response based on the context above.`);

const chain = new LLMChain({
  llm,
  prompt,
  memory,
  verbose: false,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const saveToDatabase = async (message: string, type: ConversationType) => {
  try {
    await ConversationRepository.create({
      type,
      message,
      active: true,
    });
  } catch (error) {
    Logger.error('Error saving to MongoDB:', error);
  }
};

const getLatestSummary = async (): Promise<string> => {
  try {
    const latestSummary = await ConversationRepository.findOne(
      { type: ConversationType.Summary },
      {},
      { sort: { createdAt: -1 } },
    );
    return latestSummary?.message || '';
  } catch (error) {
    Logger.error('Error retrieving latest summary:', error);
    return '';
  }
};

const generateAndSaveSummary = async () => {
  try {
    const memoryState = await memory.loadMemoryVariables({});
    const chatHistory = memoryState.chat_history || '';

    if (chatHistory) {
      // Generate a new summary using the summary chain and save it
      const summaryResult = await summaryChain.call({
        conversation: chatHistory,
      });

      await saveToDatabase(summaryResult.text, ConversationType.Summary);
      return summaryResult.text;
    }
  } catch (error) {
    Logger.error('Error generating/saving summary:', error);
  }
};

const initializeMemory = async () => {
  const previousSummary = await getLatestSummary();
  if (previousSummary) {
    await memory.saveContext(
      { input: 'MEMORY_INITIALIZATION' },
      { output: previousSummary },
    );
    Logger.info('Previous conversation context loaded.');
  }
};

const chat = async () => {
  // Initialize memory with previous context
  await initializeMemory();

  Logger.info('Chatbot initialized. Type "exit" to end the conversation.');

  while (true) {
    const input = await new Promise<string>((resolve) => {
      rl.question('You: ', resolve);
    });

    if (input.toLowerCase() === 'exit') {
      // Generate final summary before exiting and save it
      await generateAndSaveSummary();
      break;
    }

    try {
      await saveToDatabase(input, ConversationType.Human);

      const response = await chain.call({ input });
      const aiResponse = response.text.trim();

      Logger.info('AI:', aiResponse);

      await saveToDatabase(aiResponse, ConversationType.AI);

      await generateAndSaveSummary();
    } catch (error) {
      Logger.error('Error processing message:', error);
    }
  }

  rl.close();
  process.exit(0);
};

const main = async () => {
  await chat();
};

main();
