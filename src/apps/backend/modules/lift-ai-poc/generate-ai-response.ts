import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '../config';

export const generateAiResponse = async (prompt: string): Promise<string> => {
  const apiUrl = 'https://ai.avenue7media.com/api/chat/completions';
  const token = ConfigService.getValue<string>('liftAi.apiToken');
  const apiClient: AxiosInstance = axios.create({
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  try {
    const response = await apiClient.post('', {
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
