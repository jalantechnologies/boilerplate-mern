import * as readline from 'readline';
import { OpenAI } from 'openai';

import { ConfigService } from '../config';
import { Logger } from '../logger';

import ConversationRepository from './store/conversation-repository';
import { ConversationMessageType } from './types';
import ConversationMessageRepository from './store/conversation-message-repository';

// Get account ID from command line arguments to replicate multi-account chatbot,
// the script should look like: "npm run start-chat -- :accountId"
const conversationId = process.argv.slice(2)[0];

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: ConfigService.getValue('openai.apiKey'),
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const saveToDatabase = async (message, type) => {
  try {
    await ConversationRepository.create({
      conversationId,
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
    const previousMessages = await ConversationMessageRepository.find(
      {
        conversationId,
        type: { $in: [ConversationMessageType.Human, ConversationMessageType.AI] },
      },
      {},
      { sort: { createdAt: 1 } }
    );

    return previousMessages.map((msg) => {
      return msg.type === ConversationMessageType.Human
        ? { type: ConversationMessageType.Human, message: msg.message }
        : { type: ConversationMessageType.AI, message: msg.message };
    });
  } catch (error) {
    Logger.error('Error loading previous conversations:', error);
    return undefined;
  }
};

const generateResponse = async (history: {
  type: ConversationMessageType;
  message: string;
}[], input: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system' as const, content: 'You are a helpful assistant.' },
        ...history.map((chat) => {
          return {
            role:
              chat.type === ConversationMessageType.Human
                ? ('user' as const)
                : ('assistant' as const),
            content: chat.message,
          };
        }),
        { role: 'user' as const, content: input },
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    Logger.error('Error generating AI response:', error);
    throw error;
  }
};

const chat = async () => {
  const history = await loadPreviousConversations();

  Logger.info('Chatbot initialized. Type "exit" to end the conversation.');

  while (true) {
    const input = await new Promise<string>((resolve) => {
      rl.question('You: ', resolve);
    });

    if (input.toLowerCase() === 'exit') {
      break;
    }

    try {
      await saveToDatabase(input, ConversationMessageType.Human);

      const aiResponse = await generateResponse(history, input);

      Logger.info('AI:', aiResponse);

      await saveToDatabase(aiResponse, ConversationMessageType.AI);

      // Update history after response, this won't be helpful in actual implementation, just added to test through terminal
      history.push({ type: ConversationMessageType.Human, message: input });
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
