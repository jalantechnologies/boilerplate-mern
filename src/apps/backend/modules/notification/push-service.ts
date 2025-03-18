import fs from 'fs';

import admin from 'firebase-admin';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';

import { ConfigService } from '../config';

import NotificationUtil from './internal/notification-util';
import {
  BatchPushNotificationsParams,
  InvalidFirebaseServiceAccountPathError,
  ServiceError,
  PushNotifcationParams,
} from './types';

export default class PushService {
  private static firebaseApp: admin.app.App;

  public static async sendPushNotification(
    params: PushNotifcationParams
  ): Promise<string> {
    NotificationUtil.validatePushNotificationParams(params);
    try {
      const { fcmToken, body, title } = params;
      this.getFirebaseApp();
      const message = {
        token: fcmToken,
        notification: { title, body },
      };
      const firebaseApp = this.getFirebaseApp();
      return await admin.messaging(firebaseApp).send(message);
    } catch (err) {
      throw new ServiceError(err as Error);
    }
  }

  public static async sendBatchPushNotifications(
    params: BatchPushNotificationsParams
  ): Promise<{ response: BatchResponse; unsuccessfulTokens: string[] }> {
    const { fcmTokens, title, body } = params;
    if (fcmTokens.length === 0) {
      throw new Error('No FCM tokens provided.');
    }

    const firebaseApp = this.getFirebaseApp();
    const messaging = admin.messaging(firebaseApp);

    const message: admin.messaging.MulticastMessage = {
      tokens: fcmTokens,
      notification: { title, body },
    };

    try {
      const response = await messaging.sendEachForMulticast(message);
      const unsuccessfulTokens: string[] = [];

      response.responses.forEach((res, index) => {
        if (!res.success) {
          unsuccessfulTokens.push(fcmTokens[index]);
        }
      });

      return { response, unsuccessfulTokens };
    } catch (err) {
      throw new ServiceError(err as Error);
    }
  }

  public static getFirebaseApp(): admin.app.App {
    if (!this.firebaseApp) {
      try {
        const serviceAccountPath = ConfigService.getValue<string>(
          'firebase.serviceAccountPath'
        );
        if (!fs.existsSync(serviceAccountPath)) {
          throw new InvalidFirebaseServiceAccountPathError();
        }
        const serviceAccount = JSON.parse(
          fs.readFileSync(serviceAccountPath, 'utf-8')
        ) as admin.ServiceAccount;
        this.firebaseApp = admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      } catch (err) {
        throw new ServiceError(err as Error);
      }
    }
    return this.firebaseApp;
  }
}
