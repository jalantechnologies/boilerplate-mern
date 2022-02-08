import {
  PhoneNumber, SendSMSParams, ValidationError, Failure
} from "../types";
import { PhoneNumberUtil } from 'google-libphonenumber';

export class SmsParams {
  phoneNumber: PhoneNumber;
  message: string;

  constructor(params: SendSMSParams) {
    this.phoneNumber = params.to;
    this.message = params.message;
  }
  
  phoneNumberString() {
    return `${this.phoneNumber.countryCode}${this.phoneNumber.phoneNumber}`;
  }
  
  async validate() {
    const phoneUtil = PhoneNumberUtil.getInstance();
    const failures: Failure[] = [];
    const isMessageValid = !!this.message;
    const isPhoneNumberValid = phoneUtil.isValidNumber(
      phoneUtil.parse(`${this.phoneNumberString()}`)
    );
    if(!isMessageValid) {
      failures.push({
        field: 'message',
        message: 'please specify non empty message body',
      });
    }
    if(!isPhoneNumberValid) {
      failures.push({
        field: 'to',
        message: 'Please specify valid phone number to send sms to.',
      });
    }
    if(failures.length) {
      throw new ValidationError(
        'Sms sent failed, please provide valid params.',
        failures
      );
    }
  }
};
