import fs from 'fs';
import path from 'path';

import App from '../../app';
import { ConfigService } from '../config';
import { Logger } from '../logger';

import expressListRoutes from './internals/express-list-routes';
import OpenAIAdapter from './rest-api/openai-adapter';
import { HttpRouteWithDetails, HttpRoute, Nullable } from './types';

export default class DocumentationService {
  public static async generateDocumentation(): Promise<void> {
    const isDocumentationEnabled = ConfigService.getValue<boolean>(
      'documentation.enabled',
    );

    if (isDocumentationEnabled) {
      const documentationPath = path.join(
        __dirname,
        '../../../../assets/documentation/index.md',
      );
      const routes = this.getAllApiRoutesWithDetails();
      const prompt = `Generate a comprehensive API documentation in a human readable format, for the following routes: ${JSON.stringify(routes, null, 2)}. And return the documentation as a markdown file, without any additional text or comments like adding \`\`\`markdown at the beginning or at the end. Also please provide the response object in simplified JSON format, without any typescript code or comments.`;
      const markdownDocumentation =
        await OpenAIAdapter.generateDocumentation(prompt);
      fs.writeFileSync(documentationPath, markdownDocumentation, 'utf8');
    } else {
      Logger.info('Documentation is disabled for the current environment');
    }
  }

  private static getAllApiRoutesWithDetails(): HttpRouteWithDetails[] {
    const apiMicroservices = App.getAPIMicroservices();
    const routesList: HttpRouteWithDetails[] = [];

    apiMicroservices.forEach((server) => {
      const routes = expressListRoutes(server.serverInstance.server);
      const routesWithControllerMethods = routes.map((route) => {
        const controllerMethod = this.getControllerMethodCode(
          route,
          server.serverRootFolderPath,
        );
        const serializerMethod = this.getSerializerMethodCode(
          server.serverRootFolderPath,
          controllerMethod,
        );
        const responseObjectTypeDefinition = this.getParameterTypeDefinition(
          server.serverRootFolderPath,
          serializerMethod,
        );
        return {
          controllerMethod,
          endpoint: this.getEndpoint(route),
          method: route.method,
          responseObjectTypeDefinition,
          serializerMethod,
        };
      });
      routesList.push(...routesWithControllerMethods);
    });

    return routesList;
  }

  private static getControllerMethodCode(
    route: HttpRoute,
    serverRootFolderPath: string,
  ): Nullable<string> {
    const restApiFolderPath = path.join(serverRootFolderPath, 'rest-api');

    try {
      const files = fs.readdirSync(restApiFolderPath);
      const controllerFileName = files.find((file) =>
        file.endsWith('-controller.ts'),
      );

      const controllerMethodName = this.getControllerMethodName(
        serverRootFolderPath,
        route,
      );

      if (!controllerFileName) {
        Logger.warn(
          `No controller file found in the rest-api folder at path: ${restApiFolderPath}`,
        );
        return null;
      }

      const controllerFilePath = path.join(
        restApiFolderPath,
        controllerFileName,
      );
      const controllerFileContent = fs.readFileSync(controllerFilePath, 'utf8');
      const codebaseLines = controllerFileContent.split('\n');

      let methodCode = '';
      let isCapturingCodebase = false;
      let numberOfOpenBraces = 0;
      let shouldStopCapturingCodebase = false;

      codebaseLines.forEach((line) => {
        if (shouldStopCapturingCodebase) return;

        if (!isCapturingCodebase) {
          if (line.includes(`${controllerMethodName} =`)) {
            isCapturingCodebase = true;
            numberOfOpenBraces =
              (line.match(/[({]/g) || []).length -
              (line.match(/[)}]/g) || []).length;
            methodCode += `${line}\n`;
          }
        } else {
          methodCode += `${line}\n`;
          numberOfOpenBraces += (line.match(/[({]/g) || []).length;
          numberOfOpenBraces -= (line.match(/[)}]/g) || []).length;

          if (numberOfOpenBraces === 0) {
            shouldStopCapturingCodebase = true;
          }
        }
      });

      if (methodCode) {
        return methodCode.trim();
      }

      throw new Error(`No matching method found for: ${controllerMethodName}`);
    } catch (error) {
      Logger.warn(`Error reading controller file: ${error.message}`);
    }

    return null;
  }

  private static getSerializerMethodCode(
    serverRootFolderPath: string,
    controllerMethodCode: string,
  ): Nullable<string> {
    const serializeMethodName =
      this.extractSerializeMethodName(controllerMethodCode);
    if (!serializeMethodName) {
      Logger.warn('No serialize method found in the controller method code');
      return null;
    }

    const restApiFolderPath = path.join(serverRootFolderPath, 'rest-api');
    const serializerFileName = fs
      .readdirSync(restApiFolderPath)
      .find((file) => file.endsWith('-serializer.ts'));

    if (!serializerFileName) {
      Logger.warn(
        `No serializer file found in the rest-api folder at path: ${restApiFolderPath}`,
      );
      return null;
    }

    const serializerFilePath = path.join(restApiFolderPath, serializerFileName);
    const serializerFileContent = fs.readFileSync(serializerFilePath, 'utf8');
    const codebaseLines = serializerFileContent.split('\n');

    let methodCode = '';
    let isCapturingCodebase = false;
    let numberOfOpenBraces = 0;
    let shouldStopCapturingCodebase = false;

    codebaseLines.forEach((line) => {
      if (shouldStopCapturingCodebase) return;

      if (!isCapturingCodebase) {
        if (line.includes(`const ${serializeMethodName} =`)) {
          isCapturingCodebase = true;
          numberOfOpenBraces =
            (line.match(/[({]/g) || []).length -
            (line.match(/[)}]/g) || []).length;
          methodCode += `${line}\n`;
        }
      } else {
        methodCode += `${line}\n`;
        numberOfOpenBraces += (line.match(/[({]/g) || []).length;
        numberOfOpenBraces -= (line.match(/[)}]/g) || []).length;

        if (numberOfOpenBraces === 0) {
          shouldStopCapturingCodebase = true;
        }
      }
    });

    if (methodCode) {
      return methodCode.trim();
    }

    Logger.warn(
      `No matching serialize method found for: ${serializeMethodName}`,
    );
    return null;
  }

  private static getControllerMethodName(
    serverRootFolderPath: string,
    route: HttpRoute,
  ): Nullable<string> {
    const restApiFolderPath = path.join(serverRootFolderPath, 'rest-api');

    try {
      const files = fs.readdirSync(restApiFolderPath);
      const routerFileName = files.find((file) => file.endsWith('-router.ts'));

      if (!routerFileName) {
        Logger.warn(
          `No router file found in the rest-api folder at path: ${restApiFolderPath}`,
        );
        return null;
      }

      const routerFilePath = path.join(restApiFolderPath, routerFileName);
      const routerFileContent = fs.readFileSync(routerFilePath, 'utf8');

      const routeRegex = new RegExp(
        `router\\.${route.method.toLowerCase()}\\(['"]${route.routerPath}['"],\\s*ctrl\\.(\\w+)\\)`,
        'g',
      );
      const match = routeRegex.exec(routerFileContent);

      if (match) {
        const [, controllerMethod] = match;
        return controllerMethod;
      }

      throw new Error(
        `No matching route found for method: ${route.method.toUpperCase()} and path: ${route.routerPath}`,
      );
    } catch (error) {
      Logger.warn(`Error reading or writing router file: ${error.message}`);
    }

    return null;
  }

  private static extractSerializeMethodName(
    controllerMethodCode: string,
  ): string | null {
    const serializeMethodRegex = /serialize\w+AsJSON/g;
    const match = serializeMethodRegex.exec(controllerMethodCode);
    return match ? match[0] : null;
  }

  private static getParameterTypeDefinition(
    serverRootFolderPath: string,
    serializerMethodCode: string,
  ): Nullable<string> {
    const paramTypeRegex = /\(\s*(\w+)\s*:\s*([\w<>]+)\s*,?\s*\)/;
    const match = paramTypeRegex.exec(serializerMethodCode);

    if (!match) {
      Logger.warn('No parameter type found in the serializer method code');
      return null;
    }

    const [, , paramType] = match;

    const typesFilePath = path.join(serverRootFolderPath, 'types.ts');
    if (!fs.existsSync(typesFilePath)) {
      Logger.warn(`No types file found at path: ${typesFilePath}`);
      return null;
    }

    const typesFileContent = fs.readFileSync(typesFilePath, 'utf8');
    const typeDefRegex = new RegExp(
      `export\\s+class\\s+${paramType}\\s*{([^]*?)}`,
      'm',
    );
    const typeDefMatch = typeDefRegex.exec(typesFileContent);

    if (typeDefMatch) {
      return `export class ${paramType} {${typeDefMatch[1]}}`.trim();
    }

    Logger.warn(`No matching type definition found for: ${paramType}`);
    return null;
  }

  private static getEndpoint(route: HttpRoute): string {
    return `${App.baseAPIRoutePath}/${this.removeLeadingAndTrailingSlashes(route.rootRouterPath)}/${this.removeLeadingAndTrailingSlashes(route.routerPath)}`;
  }

  private static removeLeadingAndTrailingSlashes(routePath: string): string {
    return routePath.replace(/^\/|\/$/g, '');
  }
}
