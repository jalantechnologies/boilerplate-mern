import * as readline from 'readline';
import { OpenAI } from 'openai';
import { ConfigService } from '../config';
import { Logger } from '../logger';

import ConversationMessageRepository from './store/conversation-message-repository';
import { ConversationMessageType } from './types';

import { Pinecone } from '@pinecone-database/pinecone';


// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: ConfigService.getValue('openai.apiKey'),
});

// Initialize Pinecone client
const pinecone = new Pinecone({
  apiKey: ConfigService.getValue('pinecone.apiKey'),
});
const index = pinecone.index(ConfigService.getValue('pinecone.indexName'));

// Get conversation ID from command-line arguments
// const conversationId = process.argv.slice(2)[0];
const conversationId = '6674114bd48ba3e4843ff36d';

if (!conversationId) {
  Logger.error('Conversation ID is required.');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Save message to MongoDB
const saveToDatabase = async (message: string, type: ConversationMessageType) => {
  try {
    return await ConversationMessageRepository.create({
      conversationId,
      active: true,
      message,
      type,
    });
  } catch (error) {
    Logger.error('Error saving to MongoDB:', error);
    return null;
  }
};

// Store embeddings in Pinecone
const saveToPinecone = async (message, messageId) => {
  try {
    // const embeddingResponse = await openai.embeddings.create({
    //   model: 'text-embedding-ada-002',
    //   input: message,
    // });
    const embeddingResponse = await pinecone.inference.embed(
      'multilingual-e5-large',
      [message],
      { inputType: 'passage', truncate: 'END' }
    );

    // const vector = embeddingResponse.data[0].embedding;
    const vector = embeddingResponse.data[0].values;

    await index.upsert([
      {
        id: messageId,
        values: vector,
        metadata: { conversationId },
      },
    ]);
  } catch (error) {
    Logger.error('Error saving to Pinecone:', error);
  }
};

// Retrieve relevant messages from Pinecone
const retrieveRelevantMessages = async (input) => {
  try {
    const embeddingResponse = await pinecone.inference.embed(
      'multilingual-e5-large',
      [input],
      { inputType: 'query' }
    );
    const vector = embeddingResponse.data[0].values;

    const searchResults = await index.query({
      vector,
      topK: 5, // Retrieve top 5 most relevant messages
      includeValues: false,
      includeMetadata: true,
    });

    const relevantMessageIds = searchResults.matches.map(
      (match) => match.id
    );

    const relevantMessages = await ConversationMessageRepository.find({
      _id: { $in: relevantMessageIds },
    });

    return relevantMessages.map((msg) => ({
      type:
        msg.type === ConversationMessageType.Human
          ? ConversationMessageType.Human
          : ConversationMessageType.AI,
      message: msg.message,
    }));
  } catch (error) {
    Logger.error('Error retrieving relevant messages:', error);
    return [];
  }
};

// Generate response from OpenAI
export const generateResponse = async (history, input) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        ...history.map((chat) => ({
          role:
            chat.type === ConversationMessageType.Human ? 'user' : 'assistant',
          content: chat.message,
        })),
        { role: 'user', content: input },
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content.trim();
  } catch (error) {
    Logger.error('Error generating AI response:', error);
    throw error;
  }
};

// Chat loop
export const chat = async () => {
  Logger.info('Chatbot initialized. Type "exit" to end the conversation.');

  while (true) {
    const input = await new Promise<string>((resolve) => {
      rl.question('You: ', resolve);
    });

    if (input.toLowerCase() === 'exit') {
      break;
    }

    try {
      const humanPromptDb = await saveToDatabase(input, ConversationMessageType.Human);

      const relevantMessages = await retrieveRelevantMessages(input);
      console.log("🚀 ~ chat ~ relevantMessages:", relevantMessages);
      const aiResponse = await generateResponse(relevantMessages, input);

      Logger.info('AI:', aiResponse);

      const aiResponseDb = await saveToDatabase(aiResponse, ConversationMessageType.AI);

      // Generate and save embeddings
      await saveToPinecone(input, humanPromptDb._id.toString());
      await saveToPinecone(aiResponse, aiResponseDb._id.toString());
    } catch (error) {
      Logger.error('Error processing message:', error);
    }
  }

  rl.close();
  process.exit(0);
};


// Main function
const main = async () => {
  await chat();
};

main();
