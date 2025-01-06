import * as readline from 'readline';

import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatOpenAI } from '@langchain/openai';
import { ConversationTokenBufferMemory } from 'langchain/memory';

import { ConfigService } from '../config';
import { Logger } from '../logger';

import ConversationRepository from './store/conversation-repository';
import { ConversationType } from './types';

// Get account ID from command line arguments to replicate multi-account chatbot,
// the script should look like: "npm run start-chat -- :accountId"
const accountId = process.argv.slice(2)[0];

// Initialize OpenAI
const llm = new ChatOpenAI({
  openAIApiKey: ConfigService.getValue('openai.apiKey'),
  modelName: 'gpt-3.5-turbo',
  temperature: 0.7,
});

// Create memory instance with buffer
const memory = new ConversationTokenBufferMemory({
  llm,
  memoryKey: 'chat_history',
  inputKey: 'input',
  returnMessages: true,
});

// Define conversation prompt template using ChatPromptTemplate
const prompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `Previous conversation history:
{chat_history}

Provide helpful and relevant responses based on the context above.`,
  ],
  ['human', '{input}'],
]);

// Create chain using LCEL
const chain = RunnableSequence.from([
  {
    input: (initialInput) => initialInput.input,
    chat_history: async () => {
      const memoryVariables = await memory.loadMemoryVariables({});
      return memoryVariables.chat_history;
    },
  },
  prompt,
  llm,
]);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const saveToDatabase = async (message: string, type: ConversationType) => {
  try {
    await ConversationRepository.create({
      accountId,
      active: true,
      message,
      type,
    });
  } catch (error) {
    Logger.error('Error saving to MongoDB:', error);
  }
};

const loadPreviousConversations = async () => {
  try {
    const previousMessages = await ConversationRepository.find(
      {
        accountId,
        type: { $in: [ConversationType.Human, ConversationType.AI] },
      },
      {},
      { sort: { createdAt: 1 } },
    );

    // Initialize memory with previous conversations
    for (const msg of previousMessages) {
      await memory.saveContext(
        {
          input:
            msg.type === ConversationType.Human ? msg.message : 'AI_RESPONSE',
        },
        {
          output:
            msg.type === ConversationType.AI ? msg.message : 'HUMAN_MESSAGE',
        },
      );
    }

    if (previousMessages.length > 0) {
      Logger.info('Previous conversations loaded.');
    }
  } catch (error) {
    Logger.error('Error loading previous conversations:', error);
  }
};

const chat = async () => {
  await loadPreviousConversations();

  Logger.info('Chatbot initialized. Type "exit" to end the conversation.');

  while (true) {
    const input = await new Promise<string>((resolve) => {
      rl.question('You: ', resolve);
    });

    if (input.toLowerCase() === 'exit') {
      break;
    }

    try {
      await saveToDatabase(input, ConversationType.Human);

      const response = await chain.invoke({ input });
      const aiResponse = response.content.toString();

      Logger.info('AI:', aiResponse);

      await saveToDatabase(aiResponse, ConversationType.AI);

      // Update memory after response
      await memory.saveContext({ input }, { output: aiResponse });
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
