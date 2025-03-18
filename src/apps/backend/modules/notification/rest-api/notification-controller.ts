import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import NotificationService from '../notification-service';
import {
  UpdateNotificationChannelPrefrenceParams,
  UpdateNotificationTypePrefrenceParams,
  FcmTokenParams,
  DeleteFcmTokenParams,
} from '../types';

import { serializeNotificationAsJSON } from './notification-serializer';

export class NotificationController {
  updateAccountNotificationChannelPreference = applicationController(
    async (
      req: Request<UpdateNotificationChannelPrefrenceParams>,
      res: Response
    ) => {
      const { accountId } = req.params;
      const { notificationChannelPreferences } = req.body;
      const notification =
        await NotificationService.updateAccountNotificationChannelPreferences({
          accountId,
          notificationChannelPreferences,
        });
      const notificationJSON = serializeNotificationAsJSON(notification);
      res.status(HttpStatusCodes.OK).send(notificationJSON);
    }
  );

  updateAccountNotificationTypePreference = applicationController(
    async (
      req: Request<UpdateNotificationTypePrefrenceParams>,
      res: Response
    ) => {
      const { accountId } = req.params;
      const { notificationTypePreferences } = req.body;
      const notification =
        await NotificationService.updateAccountNotificationTypePreferences({
          accountId,
          notificationTypePreferences,
        });
      const notificationJSON = serializeNotificationAsJSON(notification);
      res.status(HttpStatusCodes.OK).send(notificationJSON);
    }
  );

  registerFcmToken = applicationController(
    async (req: Request<FcmTokenParams>, res: Response) => {
      const { accountId } = req.params;
      const { fcmToken } = req.body;
      const notificationFcmRegistered =
        await NotificationService.registerFcmToken({
          accountId,
          fcmToken,
        });
      const notificationFcmRegisteredJSON = serializeNotificationAsJSON(
        notificationFcmRegistered
      );
      res.status(HttpStatusCodes.OK).send(notificationFcmRegisteredJSON);
    }
  );

  deleteFcmToken = applicationController(
    async (req: Request<DeleteFcmTokenParams>, res: Response) => {
      const { accountId } = req.params as DeleteFcmTokenParams;
      await NotificationService.deleteFcmToken({ accountId });
      res.status(HttpStatusCodes.NO_CONTENT).send();
    }
  );
}
