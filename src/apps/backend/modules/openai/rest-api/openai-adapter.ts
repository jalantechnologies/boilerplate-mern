import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { ConfigService } from 'backend/modules/config';
import { Logger } from 'backend/modules/logger';
import { ErrorGettingChatCompletionResponse } from 'backend/modules/openai';

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

  private static model = 'gpt-4o-mini';

  static async getChatCompletionResponse(prompt: string): Promise<string> {
    try {
      const response: AxiosResponse = await OpenAIAdapter.apiClient.post('', {
        model: OpenAIAdapter.model,
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
        `Error getting chat completion response from OpenAI: ${error}`
      );
      throw new ErrorGettingChatCompletionResponse();
    }
  }
}
