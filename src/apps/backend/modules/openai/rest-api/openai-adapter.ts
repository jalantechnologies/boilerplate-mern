import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { ConfigService } from '../../config';
import { Logger } from '../../logger';
import { Nullable } from '../types';

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

  static async getChatCompletionResponse(
    prompt: string,
  ): Promise<Nullable<string>> {
    try {
      const response: AxiosResponse = await OpenAIAdapter.apiClient.post('', {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.2,
      });

      return response.data.choices[0].message.content as string;
    } catch (error) {
      Logger.error(
        'Error getting chat completion response from OpenAI:',
        error,
      );
      return null;
    }
  }
}
