import ConfigService from '../config/config-service';

import SendGridService from './internals/sendgrid-service';
import TwilioService from './internals/twilio-service';
import { CommunicationService, UnknownServiceError } from './types';

export default class CommunicationServiceManager {
  public static async mountService(): Promise<void> {
    const commServices: CommunicationService[] = ConfigService.getListValue<CommunicationService>(
      'communication.services',
    );

    commServices.forEach((commService) => {
      switch (commService) {
        case CommunicationService.SendGrid:
          SendGridService.initializeService();
          break;
        case CommunicationService.Twilio:
          TwilioService.initializeService();
          break;
        default:
          throw new UnknownServiceError(commService);
      }
    });
    return Promise.resolve();
  }
}
