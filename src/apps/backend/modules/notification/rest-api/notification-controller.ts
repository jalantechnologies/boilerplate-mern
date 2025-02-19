import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import NotificationService from '../notification-service';
import { UpdateNotificationPrefrenceParams } from '../types';

import { serializeNotificationtAsJSON } from './notification-serializer';

export class NotificationController {
  updateNotificationPreference = applicationController(
    async (req: Request<UpdateNotificationPrefrenceParams>, res: Response) => {
      const { accountId } = req.params;
      const { preferences } = req.body;
      const notification =
        await NotificationService.updateNotificationPreference({
          accountId,
          preferences,
        });
      const notificationJSON = serializeNotificationtAsJSON(notification);
      res.status(HttpStatusCodes.OK).send(notificationJSON);
    }
  );
}
