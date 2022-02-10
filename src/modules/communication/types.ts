// eslint-disable-next-line max-classes-per-file
export interface LooseObject {
  [key: string]: any;
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

export enum ErrorCodes {
  VALIDATION_ERROR = 'COMMUNICATION_ERR_01',
  THIRD_PARTY_ERROR = 'COMMUNICATION_ERR_02',
  SERVER_ERROR = 'COMMUNICATION_ERR_03',
}

export type ValidationFailure = {
  field: string;
  message: string;
};

export class ValidationError extends Error {
  code: ErrorCodes;

  failures: ValidationFailure[];

  constructor(msg: string, failures: ValidationFailure[] = []) {
    super(msg);
    this.code = ErrorCodes.VALIDATION_ERROR;
    this.failures = failures;
  }
}

export class ThirdPartyServiceError extends Error {
  code: ErrorCodes;

  constructor(msg: string) {
    super(msg);
    this.code = ErrorCodes.THIRD_PARTY_ERROR;
  }
}
