import {
  LooseObject,
  SendEmailParams,
  EmailServiceValidationError,
  ValidationFailure
} from "../types";
import { emailRegex } from "../constant";
export class EmailParams {
  to: string;
  from: string;
  fromName: string;
  templateId: string;
  templateData: LooseObject;
  
  constructor(params: SendEmailParams) {
    this.to = params.to;
    this.from = params.from;
    this.fromName = params.fromName;
    this.templateId = params.templateId;
    this.templateData = params.templateData;
  }

  async validate() {
    const failures: ValidationFailure[] = [];
    const isToValid = this.isEmailValid(this.to);
    const isFromValid = this.isEmailValid(this.from);
    const isfromNameValid = !!this.fromName;
    if(!isToValid) {
      failures.push({
        field: 'to',
        message: 'Please specify valid email address to be sent.'
      })
    }
    if(!isFromValid) {
      failures.push({
        field: 'from',
        message: 'Please specify valid email address to be sent.'
      })
    }
    if(!isfromNameValid) {
      failures.push({
        field: 'fromName',
        message: 'Please specify a valid name of the sending recipient.'
      })
    }
    if(failures.length) {
      throw new EmailServiceValidationError(
        'Email sent failed, please provide valid params.',
        failures
      );
    }
  }

  isEmailValid(email: string) {
    return emailRegex.test(String(email).toLowerCase());
  }
}
