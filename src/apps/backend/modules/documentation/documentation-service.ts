import fs from 'fs';
import * as path from 'path';

import { ConfigService } from 'backend/modules/config';
import {
  HttpRouteWithRootFolderPath,
  MarkdownDocumentation,
} from 'backend/modules/documentation';
import { DOCUMENTATION_GENERATION_PROMPT } from 'backend/modules/documentation/internals/constants';
import DocumentGeneratorUtil from 'backend/modules/documentation/internals/document-generator-util';
import { Logger } from 'backend/modules/logger';
import { OpenAIService } from 'backend/modules/openai';

export default class DocumentationService {
  public static expressRoutesList: HttpRouteWithRootFolderPath[] = [];

  public static async getDocumentation(): Promise<MarkdownDocumentation> {
    const isDocumentationEnabled = ConfigService.getValue<boolean>(
      'documentation.enabled'
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

  public static async generateAPIDocumentation(): Promise<MarkdownDocumentation> {
    const documentation = await this.getDocumentation();

    try {
      const assetsPath = path.join(process.cwd(), 'dist/assets/documentation');

      await fs.promises.mkdir(assetsPath, { recursive: true });

      await fs.promises.writeFile(
        path.join(assetsPath, 'index.json'),
        JSON.stringify(documentation, null, 2),
        { encoding: 'utf8', flag: 'w' }
      );
    } catch (error) {
      Logger.error('Error generating and injecting documentation:', error);
    }

    return documentation;
  }
}
