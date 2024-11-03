import { ApplicationError } from '../modules/application';
import { HttpStatusCodes } from '../modules/http';

export type Nullable<T> = T | null;

export type HttpRoute = {
  method: string;
  rootRouterPath: string;
  routerPath: string;
};

export type HttpRouteWithDetails = HttpRoute & {
  controllerMethod: string;
  responseObjectTypeDefinition: string;
  serializerMethod: string;
};

export enum DocumentationErrorCode {
  ERROR_GENERATING_DOCUMENTATION = 'DOCUMENTATION_ERR_01',
}

export class DocumentationGenerationError extends ApplicationError {
  code: DocumentationErrorCode;

  constructor(message: string) {
    super(`Documentation generation failed with error: ${message}`);
    this.code = DocumentationErrorCode.ERROR_GENERATING_DOCUMENTATION;
    this.httpStatusCode = HttpStatusCodes.SERVER_ERROR;
  }
}
