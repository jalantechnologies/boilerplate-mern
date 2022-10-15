import { PhoneNumberUtil } from 'google-libphonenumber';

import {
  PhoneNumber,
  PhoneUtilInstance,
  PhoneUtilInterface,
  SendSMSParams,
  ValidationError,
  ValidationFailure,
} from '../types';

export default class SMSParams {
  public static phoneNumberToString(phoneNumber: PhoneNumber): string {
    return `${phoneNumber.countryCode}${phoneNumber.phoneNumber}`;
  }

  public static validate(params: SendSMSParams): void {
    const failures: ValidationFailure[] = [];

    const phoneUtil = <PhoneUtilInterface>(<PhoneUtilInstance>PhoneNumberUtil).getInstance();

    const isRecipientPhoneValid: boolean = phoneUtil
      .isValidNumber(
        phoneUtil.parse(this.phoneNumberToString(params.recipientPhone)),
      );

    const isMessageValid = !!params.messageBody;
    if (!isRecipientPhoneValid) {
      failures.push({
        field: 'recipientPhone',
        message: 'Please specify valid recipient phone number in format +12124567890.',
      });
    }
    if (!isMessageValid) {
      failures.push({
        field: 'messageBody',
        message: 'Please specify a non empty message body.',
      });
    }
    if (failures.length) {
      throw new ValidationError(
        'SMS cannot be send, please check the params validity.',
        failures,
      );
    }
  }
}
