import fs from 'fs';

import admin from 'firebase-admin';

import { ConfigService } from '../config';

import NotificationUtil from './internal/notification-util';
import {
  BatchPushNotificationsParams,
  InvalidFirebaseServiceAccountPathError,
  ServiceError,
  PushNotifcationParams,
} from './types';

export default class FcmUtil {
  private static firebaseApp: admin.app.App;

  public static async sendPushNotification(
    params: PushNotifcationParams
  ): Promise<void> {
    NotificationUtil.validatePushNotificationParams(params);
    try {
      const { fcmToken, body, title } = params;
      this.getFirebaseApp();
      const message = {
        token: fcmToken,
        notification: { title, body },
      };
      await admin.messaging().send(message);
    } catch (err) {
      throw new ServiceError(err as Error);
    }
  }

  public static async sendBatchPushNotifications(
    params: BatchPushNotificationsParams
  ): Promise<void> {
    const { fcmTokens, title, body } = params;

    if (fcmTokens.length === 0) {
      throw new Error('No FCM tokens provided.');
    }

    this.getFirebaseApp();

    const message = {
      tokens: fcmTokens,
      notification: { title, body },
    };

    try {
      await admin.messaging().sendMulticast(message);
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
