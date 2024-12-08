import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export $entityTypeDef

export type Get$entityNameParams = {
    page?: number;
    size?: number;
}

export type Get$entityNameReaderParams= {
    page: number;
    size: number;
}

export interface PaginatedResponse<T>{
    data: T[];
    total: number;
}


export enum $entityNameErrorCode {
  NOT_FOUND = '$entityName_ERR_01',
}

export class $entityNameNotFoundError extends ApplicationError {
  code: $entityNameErrorCode;

  constructor($moduleNameId: string) {
    super(`$entityName with id ${$moduleNameId} not found.`);
    this.code = $entityNameErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}