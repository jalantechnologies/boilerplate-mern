import SendGridService from './internals/send-grid-service';
import TwilioService from './internals/twilio-service';

export default class CommunicationServiceManager {
  public static async mountService(): Promise<void> {
    // This method is called at the time of app start to let
    // module initialize its resources
    SendGridService.initializeService();
    TwilioService.initializeService();

    return Promise.resolve();
  }
}
