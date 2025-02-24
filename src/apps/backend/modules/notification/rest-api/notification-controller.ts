import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import NotificationService from '../notification-service';
import {
  SendEmailNotificationParams,
  SendSmsNotificationParams,
  SendPushNotificationParams,
  UpdateNotificationPrefrenceParams,
  FcmTokenParams,
  DeleteFcmTokenParams,
} from '../types';

import { serializeNotificationAsJSON } from './notification-serializer';

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
      const notificationJSON = serializeNotificationAsJSON(notification);
      res.status(HttpStatusCodes.OK).send(notificationJSON);
    }
  );

  sendEmailNotification = applicationController(
    async (req: Request<SendEmailNotificationParams>, res: Response) => {
      const { content } = req.body;
      await NotificationService.sendEmailNotification({ content });
      const messageJSON = serializeNotificationAsJSON({
        message: 'Email notifications sent successfully',
      });
      res.status(HttpStatusCodes.OK).send(messageJSON);
    }
  );

  sendSmsNotification = applicationController(
    async (req: Request<SendSmsNotificationParams>, res: Response) => {
      const { content } = req.body;
      await NotificationService.sendSmsNotification({ content });
      const messageJSON = serializeNotificationAsJSON({
        message: 'Sms notifications sent successfully',
      });
      res.status(HttpStatusCodes.OK).send(messageJSON);
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

  updateFcmToken = applicationController(
    async (req: Request<FcmTokenParams>, res: Response) => {
      const { accountId } = req.params;
      const { fcmToken } = req.body;
      const notificationFcmUpdated = await NotificationService.updateFcmToken({
        accountId,
        newFcmToken: fcmToken,
      });
      const notificationFcmUpdatedJSON = serializeNotificationAsJSON(
        notificationFcmUpdated
      );
      res.status(HttpStatusCodes.OK).send(notificationFcmUpdatedJSON);
    }
  );

  deleteFcmToken = applicationController(
    async (req: Request<DeleteFcmTokenParams>, res: Response) => {
      const { accountId } = req.params as DeleteFcmTokenParams;
      await NotificationService.deleteFcmToken({ accountId });
      res.status(HttpStatusCodes.NO_CONTENT).send();
    }
  );

  sendPushNotification = applicationController(
    async (req: Request<SendPushNotificationParams>, res: Response) => {
      const { title, body } = req.body;
      await NotificationService.sendPushNotification({ title, body });
      const messageJSON = serializeNotificationAsJSON({
        message: 'push notifications sent successfully',
      });
      res.status(HttpStatusCodes.OK).send(messageJSON);
    }
  );
}
