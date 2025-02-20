import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import NotificationService from '../notification-service';
import {
  SendEmailNotificationParams,
  UpdateNotificationPrefrenceParams,
} from '../types';

import { serializeNotificationtAsJSON } from './notification-serializer';

export class NotificationController {
  updateAccountNotificationPreference = applicationController(
    async (req: Request<UpdateNotificationPrefrenceParams>, res: Response) => {
      const { accountId } = req.params;
      const { preferences } = req.body;
      const notification =
        await NotificationService.updateAccountNotificationPreferences({
          accountId,
          preferences,
        });
      const notificationJSON = serializeNotificationtAsJSON(notification);
      res.status(HttpStatusCodes.OK).send(notificationJSON);
    }
  );

  sendEmailNotification = applicationController(
    async (req: Request<SendEmailNotificationParams>, res: Response) => {
      const { content } = req.body;
      await NotificationService.sendEmailNotification({ content });
      const messageJSON = serializeNotificationtAsJSON({
        message: 'Email notifications sent successfully',
      });
      res.status(HttpStatusCodes.OK).send(messageJSON);
    }
  );
}
