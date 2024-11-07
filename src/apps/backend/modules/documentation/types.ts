import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';
import { HttpRoute } from '../list-routes';

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

export type GetRoutesWithControllerAndSerializerDetailsResponse = {
  expressRoutesList: HttpRouteWithRootFolderPath[];
};

enum DocumentationErrorCode {
  ERROR_GENERATING_DOCUMENTATION = 'DOCUMENTATION_ERR_01',
  ERROR_READING_FILE = 'DOCUMENTATION_ERR_02',
}

export class DocumentationGenerationError extends ApplicationError {
  code: DocumentationErrorCode;

  constructor(message: string) {
    super(`Documentation generation failed with error: ${message}`);
    this.code = DocumentationErrorCode.ERROR_GENERATING_DOCUMENTATION;
    this.httpStatusCode = HttpStatusCodes.SERVER_ERROR;
  }
}

export class ErrorReadingFile extends ApplicationError {
  code: DocumentationErrorCode;

  constructor(message: string) {
    super(message);
    this.code = DocumentationErrorCode.ERROR_READING_FILE;
    this.httpStatusCode = HttpStatusCodes.SERVER_ERROR;
  }
}
