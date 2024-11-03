import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { ConfigService } from '../../modules/config';
import { Logger } from '../../modules/logger';

export default class OpenAIAdapter {
  private static apiUrl = 'https://api.openai.com/v1/chat/completions';
  private static apiKey = ConfigService.getValue<string>('openai.apiKey');
  private static apiClient: AxiosInstance = axios.create({
    baseURL: OpenAIAdapter.apiUrl,
    headers: {
      Authorization: `Bearer ${OpenAIAdapter.apiKey}`,
      'Content-Type': 'application/json',
    },
  });

  static async generateDocumentation(prompt: string): Promise<string> {
    try {
      const response: AxiosResponse = await OpenAIAdapter.apiClient.post('', {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
      });

      return response.data.choices[0].message.content as string;
    } catch (error) {
      Logger.error('Error generating documentation:', error);
      return null;
    }
  }
}
