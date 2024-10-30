import fs from 'fs';
import path from 'path';

import App from '../app';
import { ConfigService } from '../modules/config';
import { Logger } from '../modules/logger';

import expressListRoutes from './internals/express-list-routes';
import { HttpRoute, Nullable } from './types';

export default class DocumentationService {
  public static generateDocumentation(): void {
    const apiMicroservices = App.getAPIMicroservices();
    const documentationPath = path.join(
      __dirname,
      '../../../assets/documentation/index.md',
    );
    let documentationContent = '';

    apiMicroservices.forEach((server) => {
      const routes = expressListRoutes(server.serverInstance.server);
      documentationContent += `Server Root: ${server.serverRootFolderPath}\n`;
      const routesWithControllerMethods = routes.map((route) => ({
        ...route,
        controllerMethod: this.getControllerMethodCode(
          route,
          server.serverRootFolderPath,
        ),
      }));
      const routesInfo = `Routes:\n${JSON.stringify(routesWithControllerMethods, null, 2)}\n`;
      documentationContent += routesInfo;
    });

    const isDocumentationEnabled = ConfigService.getValue<boolean>(
      'documentation.enabled',
    );

    if (isDocumentationEnabled) {
      fs.writeFileSync(documentationPath, documentationContent, 'utf8');
    } else {
      Logger.info('Documentation is disabled for the current environment');
    }
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
        Logger.error(
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
      Logger.error(`Error reading or writing router file: ${error.message}`);
    }

    return null;
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
        Logger.error(
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
              (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
            methodCode += `${line}\n`;
          }
        } else {
          methodCode += `${line}\n`;
          numberOfOpenBraces += (line.match(/{/g) || []).length;
          numberOfOpenBraces -= (line.match(/}/g) || []).length;

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
      Logger.error(`Error reading controller file: ${error.message}`);
    }

    return null;
  }
}
