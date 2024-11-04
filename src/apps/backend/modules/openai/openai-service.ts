import OpenAIAdapter from './rest-api/openai-adapter';
import { Nullable } from './types';

export default class OpenAIService {
  public static async generateDocumentation(
    prompt: string,
  ): Promise<Nullable<string>> {
    return OpenAIAdapter.generateDocumentation(prompt);
  }
}
