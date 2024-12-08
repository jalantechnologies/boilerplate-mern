import OpenAIAdapter from './rest-api/openai-adapter';

export default class OpenAIService {
  public static async getChatCompletionResponse(
    prompt: string,
  ): Promise<string> {
    return OpenAIAdapter.getChatCompletionResponse(prompt);
  }
}
