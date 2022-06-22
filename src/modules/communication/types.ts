/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from '../error/app-error';

export interface LooseObject {
  [key: string]: any;
}

export interface PhoneUtilInterface {
  isValidNumber: (a: string) => boolean;
  parse: (a: string) => string;
}

export interface PhoneUtilInstance {
  getInstance: () => any;
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
  sender: EmailSender;
  recipient: EmailRecipient;
  templateId: string;
  templateData: LooseObject;
};

export type SendSMSParams = {
  recipientPhone: PhoneNumber;
  messageBody: string;
};

export enum CommunicationErrorCode {
  VALIDATION_ERROR = 'COMMUNICATION_ERR_01',
  THIRD_PARTY_ERROR = 'COMMUNICATION_ERR_02',
  SERVER_ERROR = 'COMMUNICATION_ERR_03',
  UNKNOWN_SERVICE_ERROR = 'COMMUNICATION_ERR_04',
}

export enum CommunicationService {
  Twilio = 'twilio',
  SendGrid = 'sendgrid',
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
    this.httpStatusCode = 403;
  }
}

export class ThirdPartyServiceError extends AppError {
  code: CommunicationErrorCode;

  constructor(msg: string) {
    super(msg);
    this.code = CommunicationErrorCode.THIRD_PARTY_ERROR;
    this.httpStatusCode = 403;
  }
}

export class UnknownServiceError extends AppError {
  code: CommunicationErrorCode;

  constructor(service: string) {
    super(`${service} is not supported`);
    this.code = CommunicationErrorCode.UNKNOWN_SERVICE_ERROR;
    this.httpStatusCode = 403;
  }
}
