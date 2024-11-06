import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';
import { HttpRoute } from '../list-routes';

export type Nullable<T> = T | null;

export type HttpRouteWithRootFolderPath = {
  rootFolderPath: string;
  routes: HttpRoute[];
};

export type HttpRouteWithControllerAndSerializerDetails = {
  controllerMethod: string;
  endpoint: string;
  method: string;
  serializerMethod: string;
};

export type MarkdownDocumentation = {
  markdownDocumentation: string;
};

export enum DocumentationErrorCode {
  ERROR_GENERATING_DOCUMENTATION = 'DOCUMENTATION_ERR_01',
  DOCUMENTATION_DISABLED = 'DOCUMENTATION_ERR_02',
}

export class DocumentationGenerationError extends ApplicationError {
  code: DocumentationErrorCode;

  constructor(message: string) {
    super(`Documentation generation failed with error: ${message}`);
    this.code = DocumentationErrorCode.ERROR_GENERATING_DOCUMENTATION;
    this.httpStatusCode = HttpStatusCodes.SERVER_ERROR;
  }
}

export class DocumentationDisabledError extends ApplicationError {
  code: DocumentationErrorCode;

  constructor() {
    super('Documentation is disabled for the current environment');
    this.code = DocumentationErrorCode.DOCUMENTATION_DISABLED;
  }
}
