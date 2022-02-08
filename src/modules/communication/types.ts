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

export type Failure = {
  field: string;
  message: string;
};

export class ValidationError extends Error {
  msg: string;
  code: ErrorCodes;
  failures: Failure[];
  constructor(msg: string, failures:Failure[]) {
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
  msg: string;
  code: ErrorCodes;
  constructor(msg: string) {
    super(msg);
    this.code = ErrorCodes.THIRD_PARTY_SERVICE_ERROR;
  }
};
