export interface LooseObject {
  [key: string]: any;
};

export type PhoneNumber = {
  countryCode: string;
  phoneNumber: string
};

export type SendEmailParams = {
  from: string;
  fromName: string;
  templateData: LooseObject;
  templateId: string;
  to: string;
};

export type SendSMSParams = {
  to: PhoneNumber,
  message: string
};

export enum ErrorCodes {
  VALIDATION_ERROR = 404,
  THIRD_PARTY_SERVICE_ERROR = 503,
  SERVER_ERROR = 500,
};

export type ValidationFailure = {
  field: string;
  message: string;
};

export class EmailServiceValidationError extends Error {
  msg: string;
  code: ErrorCodes;
  failures: ValidationFailure[];
  constructor(msg: string, failures:ValidationFailure[]) {
    super(msg);
    this.msg = msg;
    this.failures = failures;
  }
};

export class MissingConfigVariable extends Error {
  constructor(variableName: string) {
    super(`Missing config variable ${variableName}.`);
  }
};

export class ThirdPartyServiceError extends Error {
  code: ErrorCodes;
  constructor() {
    super('Service unavailable, please try after sometime !.');
    this.code = ErrorCodes.THIRD_PARTY_SERVICE_ERROR;
  }
};
