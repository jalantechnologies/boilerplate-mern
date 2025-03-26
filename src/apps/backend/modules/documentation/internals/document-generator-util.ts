import fs from 'fs';
import path from 'path';

import {
  ErrorReadingFile,
  GetRoutesWithControllerAndSerializerDetailsResponse,
  HttpRouteWithControllerAndSerializerDetails,
  HttpRoute,
} from 'backend/modules/documentation';
import { Nullable } from 'backend/types';

export default class DocumentGeneratorUtil {
  public static controllerFileSuffix = '-controller.js';
  public static routerFileSuffix = '-router.js';
  public static serializerFileSuffix = '-serializer.js';
  public static restApiFolderPath = 'rest-api';

  public static getRoutesWithControllerAndSerializerDetails(
    params: GetRoutesWithControllerAndSerializerDetailsResponse
  ): HttpRouteWithControllerAndSerializerDetails[] {
    const routesList: HttpRouteWithControllerAndSerializerDetails[] = [];
    const excludeSerializerMethodsForRouteMethods = ['DELETE'];

    params.expressRoutesList.forEach((routeWithRootFolderPath) => {
      const restApiFolderPath = path.join(
        routeWithRootFolderPath.rootFolderPath,
        this.restApiFolderPath
      );
      const routesWithControllerMethods = routeWithRootFolderPath.routes.map(
        (route) => {
          const controllerMethod = this.getControllerMethodCode(
            restApiFolderPath,
            route
          );
          let serializerMethod: Nullable<string> = null;
          if (!excludeSerializerMethodsForRouteMethods.includes(route.method)) {
            serializerMethod = this.getSerializerMethodCode(
              controllerMethod,
              restApiFolderPath
            );
          }
          return {
            controllerMethod,
            endpoint: this.getEndpoint(route),
            method: route.method,
            serializerMethod,
          };
        }
      );
      routesList.push(...routesWithControllerMethods);
    });

    return routesList;
  }

  private static getControllerMethodCode(
    restApiFolderPath: string,
    route: HttpRoute
  ): string {
    const controllerMethodName = this.getControllerMethodName(
      restApiFolderPath,
      route
    );

    if (!controllerMethodName) {
      throw new ErrorReadingFile(
        'Controller method name could not be determined'
      );
    }

    return this.extractMethodCodeWithSignature(
      this.controllerFileSuffix,
      restApiFolderPath,
      `${controllerMethodName} =`
    );
  }

  private static getSerializerMethodCode(
    controllerMethodCode: string,
    restApiFolderPath: string
  ): string {
    const serializeMethodName =
      this.extractSerializeMethodName(controllerMethodCode);

    if (!serializeMethodName) {
      throw new ErrorReadingFile(
        'No serialize method found in the controller method code'
      );
    }

    return this.extractMethodCodeWithSignature(
      this.serializerFileSuffix,
      restApiFolderPath,
      `const ${serializeMethodName} =`
    );
  }

  private static getControllerMethodName(
    restApiFolderPath: string,
    route: HttpRoute
  ): string {
    try {
      const files = fs.readdirSync(restApiFolderPath);
      const routerFileName = files.find((file) =>
        file.endsWith(this.routerFileSuffix)
      );

      if (!routerFileName) {
        throw new ErrorReadingFile(
          `No router file found in the rest-api folder at path: ${restApiFolderPath}`
        );
      }

      const routerFilePath = path.join(restApiFolderPath, routerFileName);
      const routerFileContent = fs.readFileSync(routerFilePath, 'utf8');

      const routeRegex = new RegExp(
        `router\\.${route.method.toLowerCase()}\\(['"]${route.routerPath}['"],\\s*ctrl\\.(\\w+)\\)`,
        'g'
      );
      const match = routeRegex.exec(routerFileContent);

      if (match) {
        const [, controllerMethod] = match;
        return controllerMethod;
      }

      throw new ErrorReadingFile(
        `No matching route found for method: ${route.method.toUpperCase()} and path: ${route.routerPath}`
      );
    } catch (error) {
      throw new ErrorReadingFile(
        `Error reading or writing router file: ${error.message}`
      );
    }
  }

  private static extractSerializeMethodName(
    controllerMethodCode: string
  ): Nullable<string> {
    if (!controllerMethodCode) return null;

    const serializeMethodRegex = /serialize\w+AsJSON/g;
    const match = serializeMethodRegex.exec(controllerMethodCode);
    return match ? match[0] : null;
  }

  private static getEndpoint(route: HttpRoute): string {
    const baseApiRoutePath =
      this.addLeadingSlashesIfNotExistsAndRemoveTrailingSlashes(
        route.baseAPIRoutePath
      );
    const rootRouterPath =
      this.addLeadingSlashesIfNotExistsAndRemoveTrailingSlashes(
        route.rootRouterPath
      );
    const routerPath =
      this.addLeadingSlashesIfNotExistsAndRemoveTrailingSlashes(
        route.routerPath
      );
    return `${baseApiRoutePath}${rootRouterPath}${routerPath}`;
  }

  private static addLeadingSlashesIfNotExistsAndRemoveTrailingSlashes(
    routePath: string
  ): string {
    const trimmedRoutePath = routePath.replace(/(^\/)|(\/$)/g, '');
    return trimmedRoutePath ? `/${trimmedRoutePath}` : '';
  }

  private static extractMethodCodeWithSignature(
    fileSuffix: string,
    folderPath: string,
    methodSignature: string
  ): string {
    try {
      const fileName = this.findFileWithSuffix(fileSuffix, folderPath);

      const fileContent = this.readFileContent(fileName, folderPath);
      const methodCode = this.extractMethodFromContent(
        fileContent,
        methodSignature
      );

      if (methodCode) {
        return methodCode.trim();
      }

      throw new ErrorReadingFile(
        `No matching method found for signature: ${methodSignature}`
      );
    } catch (error) {
      throw new ErrorReadingFile(`Error reading file: ${error.message}`);
    }
  }

  private static findFileWithSuffix(
    fileSuffix: string,
    folderPath: string
  ): string {
    const files = fs.readdirSync(folderPath);
    const fileName = files.find((file) => file.endsWith(fileSuffix));

    if (!fileName) {
      throw new ErrorReadingFile(
        `No file found with suffix ${fileSuffix} in folder: ${folderPath}`
      );
    }

    return fileName;
  }

  private static readFileContent(fileName: string, folderPath: string): string {
    const filePath = path.join(folderPath, fileName);
    return fs.readFileSync(filePath, 'utf8');
  }

  private static extractMethodFromContent(
    fileContent: string,
    methodSignature: string
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
