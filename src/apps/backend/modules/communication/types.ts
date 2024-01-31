import { AppError } from '../error';
import { HttpStatusCodes } from '../http';

export interface LooseObject {
  [key: string]: unknown;
}

export interface PhoneUtilInterface {
  isValidNumber: (a: string) => boolean;
  parse: (a: string) => string;
}

export interface PhoneUtilInstance {
  getInstance: () => unknown;
}

export type PhoneNumber = {
  countryCode: string;
  phoneNumber: string;
};

export type EmailSender = {
  email: string;
  name: string;
};

export type EmailRecipient = {
  email: string;
};

export type SendEmailParams = {
  recipient: EmailRecipient;
  sender: EmailSender;
  templateData?: LooseObject;
  templateId: string;
};

export type SendSMSParams = {
  messageBody: string;
  recipientPhone: PhoneNumber;
};

export enum CommunicationErrorCode {
  VALIDATION_ERROR = 'COMMUNICATION_ERR_01',
  SERVICE_ERROR = 'COMMUNICATION_ERR_02',
}

export type ValidationFailure = {
  field: string;
  message: string;
};

export class ValidationError extends AppError {
  code: CommunicationErrorCode;
  failures: ValidationFailure[];

  constructor(msg: string, failures: ValidationFailure[] = []) {
    super(msg);
    this.code = CommunicationErrorCode.VALIDATION_ERROR;
    this.failures = failures;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}

export class ServiceError extends AppError {
  code: CommunicationErrorCode;

  constructor(err: Error) {
    super(err.message);
    this.stack = err.stack;
    this.code = CommunicationErrorCode.SERVICE_ERROR;
    this.httpStatusCode = HttpStatusCodes.SERVICE_UNAVAILABLE;
  }
}
