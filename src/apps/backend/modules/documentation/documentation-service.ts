import fs from 'fs';
import path from 'path';

import App from '../../app';
import { ConfigService } from '../config';
import { Logger } from '../logger';
import { OpenAIService } from '../openai';

import { DOCUMENTATION_GENERATION_PROMPT } from './internals/constants';
import expressListRoutes from './internals/express-list-routes';
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
      const prompt = `${DOCUMENTATION_GENERATION_PROMPT}\n${JSON.stringify(routes, null, 2)}`;
      const markdownDocumentation =
        await OpenAIService.getChatCompletionResponse(prompt);
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
        const restApiFolderPath = path.join(
          server.serverRootFolderPath,
          'rest-api',
        );
        const controllerMethod = this.getControllerMethodCode(
          restApiFolderPath,
          route,
        );
        const serializerMethod = this.getSerializerMethodCode(
          controllerMethod,
          restApiFolderPath,
        );
        const responseObjectTypeDefinition = this.getParameterTypeDefinition(
          serializerMethod,
          server.serverRootFolderPath,
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
    restApiFolderPath: string,
    route: HttpRoute,
  ): Nullable<string> {
    const controllerMethodName = this.getControllerMethodName(
      restApiFolderPath,
      route,
    );

    if (!controllerMethodName) {
      Logger.warn('Controller method name could not be determined');
      return null;
    }

    return this.extractMethodCodeWithSignature(
      '-controller.ts',
      restApiFolderPath,
      `${controllerMethodName} =`,
    );
  }

  private static getSerializerMethodCode(
    controllerMethodCode: string,
    restApiFolderPath: string,
  ): Nullable<string> {
    const serializeMethodName =
      this.extractSerializeMethodName(controllerMethodCode);

    if (!serializeMethodName) {
      Logger.warn('No serialize method found in the controller method code');
      return null;
    }

    return this.extractMethodCodeWithSignature(
      '-serializer.ts',
      restApiFolderPath,
      `const ${serializeMethodName} =`,
    );
  }

  private static getControllerMethodName(
    restApiFolderPath: string,
    route: HttpRoute,
  ): Nullable<string> {
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
    serializerMethodCode: string,
    serverRootFolderPath: string,
  ): Nullable<string> {
    const paramTypeRegex = /\([\s]*(\w+)[\s]*:[\s]*([\w<>]+)(?:[\s]*,)?[\s]*\)/;
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
    const baseApiRoutePath =
      this.addLeadingSlashesIfNotExistsAndRemoveTrailingSlashes(
        App.baseAPIRoutePath,
      );
    const rootRouterPath =
      this.addLeadingSlashesIfNotExistsAndRemoveTrailingSlashes(
        route.rootRouterPath,
      );
    const routerPath =
      this.addLeadingSlashesIfNotExistsAndRemoveTrailingSlashes(
        route.routerPath,
      );
    return `${baseApiRoutePath}${rootRouterPath}${routerPath}`;
  }

  private static addLeadingSlashesIfNotExistsAndRemoveTrailingSlashes(
    routePath: string,
  ): string {
    const trimmedRoutePath = routePath.replace(/(^\/)|(\/$)/g, '');
    return trimmedRoutePath ? `/${trimmedRoutePath}` : '';
  }

  private static extractMethodCodeWithSignature(
    fileSuffix: string,
    folderPath: string,
    methodSignature: string,
  ): Nullable<string> {
    try {
      const fileName = this.findFileWithSuffix(fileSuffix, folderPath);
      if (!fileName) return null;

      const fileContent = this.readFileContent(fileName, folderPath);
      const methodCode = this.extractMethodFromContent(
        fileContent,
        methodSignature,
      );

      if (methodCode) {
        return methodCode.trim();
      }

      throw new Error(
        `No matching method found for signature: ${methodSignature}`,
      );
    } catch (error) {
      Logger.warn(`Error reading file: ${error.message}`);
      return null;
    }
  }

  private static findFileWithSuffix(
    fileSuffix: string,
    folderPath: string,
  ): Nullable<string> {
    const files = fs.readdirSync(folderPath);
    const fileName = files.find((file) => file.endsWith(fileSuffix));

    if (!fileName) {
      Logger.warn(
        `No file found with suffix ${fileSuffix} in folder: ${folderPath}`,
      );
      return null;
    }

    return fileName;
  }

  private static readFileContent(fileName: string, folderPath: string): string {
    const filePath = path.join(folderPath, fileName);
    return fs.readFileSync(filePath, 'utf8');
  }

  private static extractMethodFromContent(
    fileContent: string,
    methodSignature: string,
  ): string {
    const codebaseLines = fileContent.split('\n');
    let methodCode = '';
    let isCapturingCodebase = false;
    let numberOfOpenBraces = 0;

    codebaseLines.some((line) => {
      if (!isCapturingCodebase) {
        if (line.includes(methodSignature)) {
          isCapturingCodebase = true;
          numberOfOpenBraces = this.countBraces(line);
          methodCode += `${line}\n`;
        }
        return false;
      }

      methodCode += `${line}\n`;
      numberOfOpenBraces += this.countBraces(line);

      return numberOfOpenBraces === 0;
    });

    return methodCode;
  }

  private static countBraces(line: string): number {
    const openBraces = (line.match(/[({]/g) || []).length;
    const closeBraces = (line.match(/[)}]/g) || []).length;
    return openBraces - closeBraces;
  }
}
