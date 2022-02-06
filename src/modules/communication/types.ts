export interface LooseObject {
  [key: string]: any;
}

export type PhoneNumber = {
  countryCode: string;
  phoneNumber: string
};

export type SendEmailParams = {
  from: string;
  templateDate: LooseObject;
  templateId: string;
  to: string;
};

export type SendSMSParams = {
  to: PhoneNumber,
  message: string
};
