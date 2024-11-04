import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export type Nullable<T> = T | null;

export type HttpRoute = {
  method: string;
  rootRouterPath: string;
  routerPath: string;
};

export type HttpRouteWithDetails = {
  controllerMethod: string;
  endpoint: string;
  method: string;
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
