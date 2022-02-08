// eslint-disable-next-line max-classes-per-file
export interface LooseObject {
  [key: string]: any;
}
export interface MessageBody {
  to: string;
  from: {
    email: string;
    name: string;
  },
  templateId?: string;
  dynamic_template_data?: LooseObject
}

export type PhoneNumber = {
  countryCode: string;
  phoneNumber: string
};

export type EmailSender = {
  email: string;
  name: string;
};

export type EmailRecipient = {
  email: string
};

export type SendEmailParams = {
  sender: EmailSender;
  templateData: LooseObject;
  templateId: string;
  recipient: EmailRecipient;
};

export type SendSMSParams = {
  to: PhoneNumber,
  message: string
};

export enum ErrorCodes {
  VALIDATION_ERROR = 404,
  THIRD_PARTY_SERVICE_ERROR = 503,
  SERVER_ERROR = 500,
}

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
}

export class ThirdPartyServiceError extends Error {
  msg: string;

  code: ErrorCodes;

  constructor(msg: string) {
    super(msg);
    this.code = ErrorCodes.THIRD_PARTY_SERVICE_ERROR;
  }
}
