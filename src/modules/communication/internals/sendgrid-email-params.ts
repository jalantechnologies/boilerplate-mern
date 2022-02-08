import {
  LooseObject,
  SendEmailParams,
  ValidationError,
  Failure,
  EmailSender,
  EmailRecipient,
} from '../types';
import emailRegex from './constant';

export default class EmailParams {
  recipient: EmailRecipient;

  sender: EmailSender;

  templateId: string;

  templateData: LooseObject;

  constructor(params: SendEmailParams) {
    this.recipient = params.recipient;
    this.sender = params.sender;
    this.templateId = params.templateId;
    this.templateData = params.templateData;
  }

  validate(): void {
    const failures: Failure[] = [];
    const isToValid = this.isEmailValid(this.recipient.email);
    const isFromValid = this.isEmailValid(this.sender.email);
    const isfromNameValid = !!this.sender.name;
    if (!isToValid) {
      failures.push({
        field: 'recipient email',
        message: 'Please specify valid email address to be sent.',
      });
    }
    if (!isFromValid) {
      failures.push({
        field: 'sender email',
        message: 'Please specify valid email address to be sent.',
      });
    }
    if (!isfromNameValid) {
      failures.push({
        field: 'sender name',
        message: 'Please specify a valid name of the sending recipient.',
      });
    }
    if (failures.length) {
      throw new ValidationError(
        'Email sent failed, please provide valid params.',
        failures,
      );
    }
  }

  // eslint-disable-next-line class-methods-use-this
  isEmailValid(email: string): boolean {
    return emailRegex.test(String(email).toLowerCase());
  }
}
