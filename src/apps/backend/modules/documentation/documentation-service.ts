import { ConfigService } from '../config';
import { OpenAIService } from '../openai';

import { DOCUMENTATION_GENERATION_PROMPT } from './internals/constants';
import DocumentGeneratorUtil from './internals/document-generator-util';
import { HttpRouteWithRootFolderPath, MarkdownDocumentation } from './types';

export default class DocumentationService {
  public static expressRoutesList: HttpRouteWithRootFolderPath[] = [];

  public static async getDocumentation(): Promise<MarkdownDocumentation> {
    const isDocumentationEnabled = ConfigService.getValue<boolean>(
      'documentation.enabled',
    );

    if (!isDocumentationEnabled) {
      return {
        markdownDocumentation: '',
      };
    }

    const routes =
      DocumentGeneratorUtil.getRoutesWithControllerAndSerializerDetails({
        expressRoutesList: this.expressRoutesList,
      });

    const prompt = `${DOCUMENTATION_GENERATION_PROMPT}\n${JSON.stringify(routes, null, 2)}`;

    return {
      markdownDocumentation:
        await OpenAIService.getChatCompletionResponse(prompt),
    };
  }
}
