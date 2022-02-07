export interface LooseObject {
  [key: string]: any;
}

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

export enum SendGridErrorCode {
  VALIDATION_ERROR = 404,
}
export type ValidationFailure = {
  field: string;
  message: string;
}
export class SendGridValidationError extends Error {
  msg: string;
  code: SendGridErrorCode;
  failures: ValidationFailure[];
  constructor(msg: string, failures:ValidationFailure[]) {
    super(msg);
    this.msg = msg;
    this.failures = failures;
  }
}
