import fs from 'fs';
import path from 'path';

export interface RouteMetadata {
  method: string;
  route: string;
  controller: string;
  action: string;
  controllerMethod: string;
  serializerMethod: string;
  returnType: string;
}

export const routeMetadata: RouteMetadata[] = [];

function extractControllerMethod(filePath: string, methodName: string): string {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const lines = fileContent.split('\n');
  let methodContent = '';
  let braceCount = 0;
  let capturing = false;

  for (const line of lines) {
    if (line.includes(`${methodName} = applicationController(`)) {
      capturing = true;
    }

    if (capturing) {
      methodContent += `${line}\n`;
      braceCount += (line.match(/{/g) || []).length;
      braceCount -= (line.match(/}/g) || []).length;

      if (braceCount === 0 && line.trim().endsWith(');')) {
        break;
      }
    }
  }

  return methodContent.trim();
}

function extractSerializerMethod(filePath: string, methodName: string): string {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  // const methodRegex = new RegExp(`export const ${methodName}.*?}`, 's');
  // const match = methodRegex.exec(fileContent);
  // return match ? match[0] : '';

  const lines = fileContent.split('\n');
  let methodContent = '';
  let braceCount = 0;
  let capturing = false;

  for (const line of lines) {
    if (line.includes(`export const ${methodName}`)) {
      capturing = true;
    }

    if (capturing) {
      methodContent += `${line}\n`;
      braceCount += (line.match(/{/g) || []).length;
      braceCount -= (line.match(/}/g) || []).length;

      if (braceCount === 0 && line.trim().endsWith(');')) {
        break;
      }
    }
  }

  return methodContent.trim();
}

function extractReturnType(filePath: string, typeName: string): string {
  const fullPath = path.join(process.cwd(), filePath);
  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const typeRegex = new RegExp(
    `export (type|class|interface) ${typeName}.*?}`,
    's',
  );
  const match = typeRegex.exec(fileContent);
  return match ? match[0] : '';
}

// TODO: create a typedef for params
export function registerRoute(
  method: string,
  route: string,
  controller: string,
  action: string,
  controllerFile: string,
  serializerFile: string,
  serializerMethod: string,
  typeFile: string,
  returnType: string,
) {
  const controllerMethod = extractControllerMethod(controllerFile, action);
  const serializerMethodContent = extractSerializerMethod(
    serializerFile,
    serializerMethod,
  );
  const returnTypeContent = extractReturnType(typeFile, returnType);

  routeMetadata.push({
    method,
    route,
    controller,
    action,
    controllerMethod,
    serializerMethod: serializerMethodContent,
    returnType: returnTypeContent,
  });
}
