import axios from 'axios';
import { ConfigService } from '../config';

const chatCompletionApiUrl = 'https://ai.avenue7media.com/api/chat/completions';
const llmModalsUrl = 'https://ai.avenue7media.com/api/models';
const token = ConfigService.getValue<string>('liftAi.apiToken');

const getApiClient = (isChatCompletion: boolean) => {
  return axios.create({
    baseURL: isChatCompletion ? chatCompletionApiUrl : llmModalsUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const generateAiResponse = async (prompt: string): Promise<string> => {
  try {
    const response = await getApiClient(true).post('', {
      model: 'llama3.1:8b',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating AI response:', error);
    throw error;
  }
};

export const getAvailableModels = async (): Promise<string[]> => {
  try {
    const response = await getApiClient(false).get('');
    return response.data.data.map((modelDetails) => modelDetails.name);
  } catch (error) {
    console.error('Error fetching available models:', error);
    throw error;
  }
}
