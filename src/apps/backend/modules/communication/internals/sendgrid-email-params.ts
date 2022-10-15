import {
  SendEmailParams,
  ValidationError,
  ValidationFailure,
} from '../types';

import emailRegex from './constant';

export default class EmailParams {
  public static validate(params: SendEmailParams): void {
    const failures: ValidationFailure[] = [];
    const recipientEmailValid = this.isEmailValid(params.recipient.email);
    const senderEmailValid = this.isEmailValid(params.sender.email);
    const senderNameValid = !!params.sender.name;
    if (!recipientEmailValid) {
      failures.push({
        field: 'recipient.email',
        message: 'Please specify valid recipient email in format you@example.com.',
      });
    }

    if (!senderEmailValid) {
      failures.push({
        field: 'sender.email',
        message: 'Please specify valid sender email in format you@example.com.',
      });
    }

    if (!senderNameValid) {
      failures.push({
        field: 'sender.name',
        message: 'Please specify a non empty sender name.',
      });
    }

    if (failures.length) {
      throw new ValidationError(
        'Email cannot be send, please check the params validity.',
        failures,
      );
    }
  }

  public static isEmailValid(email: string): boolean {
    return emailRegex.test(String(email).toLowerCase());
  }
}
