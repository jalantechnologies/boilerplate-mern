import SendGridService from './internals/sendgrid-service';
import TwilioService from './internals/twilio-service';

export default class CommunicationServiceManager {
  public static async mountService(): Promise<void> {
    SendGridService.initializeService();
    TwilioService.initializeService();
    return Promise.resolve();
  }
}
