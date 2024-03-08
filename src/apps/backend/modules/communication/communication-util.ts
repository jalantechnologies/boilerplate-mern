import { PhoneNumberUtil } from 'google-libphonenumber';

import {
  PhoneUtilInstance,
  PhoneUtilInterface,
  ValidationError,
  ValidationFailure,
} from './types';

export default class CommunicationUtil {
  public static checkPhoneNumberValidation(phoneNumber: string): boolean {
    const phoneUtil = <PhoneUtilInterface>(<PhoneUtilInstance>PhoneNumberUtil).getInstance();

    return phoneUtil.isValidNumber(
      phoneUtil.parse(
        phoneNumber,
      ),
    );
  }

  public static validatePhoneNumber(phoneNumber: string): boolean {
    if (this.checkPhoneNumberValidation(phoneNumber)) {
      return true;
    }

    const failure: ValidationFailure = {
      field: 'recipientPhone',
      message: 'Please specify valid recipient phone number in format +12124567890.',
    };

    throw new ValidationError(
      'Invalid Phone Number, SMS cannot be send. Please check the Phone Number and Country Code',
      [failure],
    );
  }
}
