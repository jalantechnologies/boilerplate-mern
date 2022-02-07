import {
  LooseObject,
  SendEmailParams,
  SendGridValidationError,
  ValidationFailure
} from "../types";

export class SendGridEmailParams {
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
    if(!isToValid || !isFromValid || !isfromNameValid) {
      if(!isToValid) {
        failures.push({
          field: 'to',
          message: 'Please specify valid email address to be sent.',
        });
      }
      if(!isFromValid) {
        failures.push({
          field: 'from',
          message: 'Please specify a valid from email.'
        })
      }
      if(!isfromNameValid) {
        failures.push({
          field: 'fromName',
          message: 'Please specify a valid name of the sending recipient.',
        }); 
      }
      throw new SendGridValidationError(
        'Cannot send email, as one or more params are invalid.',
        failures
      );
    }
  }

  isEmailValid(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
