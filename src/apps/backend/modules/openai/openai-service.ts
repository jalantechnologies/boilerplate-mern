import OpenAIAdapter from './rest-api/openai-adapter';
import { Nullable } from './types';

export default class OpenAIService {
  public static async getChatCompletionResponse(
    prompt: string,
  ): Promise<Nullable<string>> {
    return OpenAIAdapter.getChatCompletionResponse(prompt);
  }
}
