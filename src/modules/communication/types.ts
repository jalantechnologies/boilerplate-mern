import AppError from '../app-error/app-error';

// eslint-disable-next-line max-classes-per-file
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

export enum CommunicationErrorCodes {
  VALIDATION_ERROR = 'COMMUNICATION_ERR_01',
  THIRD_PARTY_ERROR = 'COMMUNICATION_ERR_02',
  SERVER_ERROR = 'COMMUNICATION_ERR_03',
}

export type ValidationFailure = {
  field: string;
  message: string;
};

export class ValidationError extends AppError {
  code: CommunicationErrorCodes;

  failures: ValidationFailure[];

  constructor(msg: string, failures: ValidationFailure[] = []) {
    super(msg);
    this.code = CommunicationErrorCodes.VALIDATION_ERROR;
    this.failures = failures;
    this.httpStatusCode = 403;
  }
}

export class ThirdPartyServiceError extends AppError {
  code: CommunicationErrorCodes;

  constructor(msg: string) {
    super(msg);
    this.code = CommunicationErrorCodes.THIRD_PARTY_ERROR;
    this.httpStatusCode = 403;
  }
}
