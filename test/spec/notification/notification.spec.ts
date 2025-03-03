/*
import faker from '@faker-js/faker';
import chai, { expect } from 'chai';
import sinon from 'sinon';

import {
  Account,
  AccountService,
  PhoneNumber,
} from '../../../src/apps/backend/modules/account';
import AccountRepository from '../../../src/apps/backend/modules/account/internal/store/account-repository';
import { ConfigService } from '../../../src/apps/backend/modules/config';
import {
  NotificationService,
  NotificationPreferencesNotFoundError,
  AccountsWithParticularNotificationPreferencesNotFoundError,
} from '../../../src/apps/backend/modules/notification';
import NotificationReader from '../../../src/apps/backend/modules/notification/internal/notification-reader';
import { createAccount } from '../../helpers/account';
import { app } from '../../helpers/app';

describe('Notification API', () => {
  let sinonSandbox: sinon.SinonSandbox;
  let account: Account;
  let accountWithPhoneNumber: Account;

  beforeEach(async () => {
    sinonSandbox = sinon.createSandbox();
    ({ account } = await createAccount());
    const phoneNumber = {
      countryCode: '+91',
      phoneNumber: '7895586769',
    };
    account.phoneNumber = new PhoneNumber(
      phoneNumber.countryCode,
      phoneNumber.phoneNumber
    );
  });

  afterEach(async () => {
    sinonSandbox.restore();
    if (account?.id) {
      await AccountRepository.deleteOne({
        _id: account.id,
      });
    }
    if (accountWithPhoneNumber?.id) {
      await AccountRepository.deleteOne({
        _id: accountWithPhoneNumber.id,
      });
    }
  });

  describe('POST /notifications/email', () => {
    it('should send email notifications successfully', async () => {
      const content = 'Test notification email content';
      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationPreferences'
        )
        .resolves([account.id]);
      sinonSandbox.stub(AccountService, 'getAccountById').resolves(account);
      const sendEmailStub = sinonSandbox
        .stub(NotificationService, 'sendEmail')
        .resolves();
      const res = await chai
        .request(app)
        .post('/api/notifications/email')
        .set('content-type', 'application/json')
        .send({ content });
      expect(res.status).to.be.eq(200);
      expect(res.body.message).to.eq('Email notifications sent successfully');
      expect(
        sendEmailStub.calledWithMatch({
          recipient: { email: account.username },
          templateData: sinon.match({ firstName: account.firstName, content }),
        })
      ).to.be.true;
    });
    it('should return 404 if no accounts have email notifications enabled', async () => {
      const content = 'Test notification email content';
      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationPreferences'
        )
        .resolves(null);
      const res = await chai
        .request(app)
        .post('/api/notifications/email')
        .set('content-type', 'application/json')
        .send({ content });
      expect(res.status).to.be.eq(404);
      expect(res.body.message).to.eq(
        new AccountsWithParticularNotificationPreferencesNotFoundError().message
      );
    });
  });

  describe('POST /notifications/sms', () => {
    it('should send sms notifications successfully', async () => {
      const content = 'Test notification sms content';
      sinonSandbox
        .stub(ConfigService, 'getValue')
        .withArgs('sms.enabled')
        .returns(true);
      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationPreferences'
        )
        .resolves([account.id]);
      sinonSandbox.stub(AccountService, 'getAccountById').resolves(account);
      const sendSmsStub = sinonSandbox
        .stub(NotificationService, 'sendSMS')
        .resolves();
      const res = await chai
        .request(app)
        .post('/api/notifications/sms')
        .set('content-type', 'application/json')
        .send({ content });
      expect(res.status).to.be.eq(200);
      expect(res.body.message).to.eq('Sms notifications sent successfully');
      expect(
        sendSmsStub.calledWithMatch({
          messageBody: content,
          recipientPhone: account.phoneNumber,
        })
      ).to.be.true;
    });
    it('should return 404 if no accounts have sms notifications enabled', async () => {
      const content = 'Test notification sms content';
      sinonSandbox
        .stub(ConfigService, 'getValue')
        .withArgs('sms.enabled')
        .returns(true);
      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationPreferences'
        )
        .resolves(null);
      const res = await chai
        .request(app)
        .post('/api/notifications/sms')
        .set('content-type', 'application/json')
        .send({ content });
      expect(res.status).to.be.eq(404);
      expect(res.body.message).to.eq(
        new AccountsWithParticularNotificationPreferencesNotFoundError().message
      );
    });
  });

  describe('POST /notifications/push', () => {
    it('should send push notifications successfully', async () => {
      const title = 'Test Push Notification';
      const body = 'This is a test push notification';
      const fcmToken = faker.random.alphaNumeric(32);

      const RegisterFcmToken = {
        accountId: account.id,
        fcmToken,
      };
      const notificationInstance =
        await NotificationService.registerFcmToken(RegisterFcmToken);
      sinonSandbox
        .stub(
          NotificationService,
          'getNotificationInstancesWithParticularNotificationPreferences'
        )
        .resolves([notificationInstance]);
      const sendPushNotificationStub = sinonSandbox
        .stub(NotificationService, 'sendPushNotification')
        .resolves();
      const res = await chai
        .request(app)
        .post('/api/notifications/push')
        .set('content-type', 'application/json')
        .send({ title, body });
      expect(res.status).to.be.eq(200);
      expect(res.body.message).to.eq('push notifications sent successfully');
      expect(sendPushNotificationStub.calledWithMatch({ title, body })).to.be
        .true;
    });
    it('should return 404 if no accounts have push notifications enabled', async () => {
      const title = 'Test Push Notification';
      const body = 'This is a test push notification';
      sinonSandbox
        .stub(
          NotificationService,
          'getNotificationInstancesWithParticularNotificationPreferences'
        )
        .resolves(null);
      const res = await chai
        .request(app)
        .post('/api/notifications/push')
        .set('content-type', 'application/json')
        .send({ title, body });
      expect(res.status).to.be.eq(404);
      expect(res.body.message).to.eq(
        new AccountsWithParticularNotificationPreferencesNotFoundError().message
      );
    });
  });

  describe('PATCH /notifications/:accountId', () => {
    it('should update the notification preferences of the accountId to the new notification preferences', async () => {
      const newPreferences = {
        email: false,
      };
      const updateNotificationPreferenceParams = {
        preferences: newPreferences,
      };
      const res = await chai
        .request(app)
        .patch(`/api/notifications/${account.id}`)
        .set('content-type', 'application/json')
        .send(updateNotificationPreferenceParams);

      expect(res.status).to.be.eq(200);
      expect(res.body.account).to.eq(account.id);
      expect(res.body.preferences.email).to.eq(newPreferences.email);
    });
    it('should throw an error when updating notification preferences with an account ID that does not exist', async () => {
      const accountId = faker.database.mongodbObjectId();
      const newPreferences = {
        email: false,
      };
      const updateNotificationPreferenceParams = {
        preferences: newPreferences,
      };

      const res = await chai
        .request(app)
        .patch(`/api/notifications/${accountId}`)
        .set('content-type', 'application/json')
        .send(updateNotificationPreferenceParams);

      expect(res.status).to.be.eq(404);
      expect(res.body.message).to.eq(
        new NotificationPreferencesNotFoundError(accountId).message
      );
    });
  });

  describe('POST /notifications/fcm/:accountId', () => {
    it('should register FCM token successfully', async () => {
      const fcmToken = faker.random.alphaNumeric(32);
      const res = await chai
        .request(app)
        .post(`/api/notifications/fcm/${account.id}`)
        .set('content-type', 'application/json')
        .send({ fcmToken });
      expect(res.status).to.be.eq(200);
      expect(res.body.account).to.eq(account.id);
      expect(res.body.fcmToken).to.eq(fcmToken);
    });
    it('should return 400 if fcmToken is missing', async () => {
      const fcmToken: string = null;
      const res = await chai
        .request(app)
        .post(`/api/notifications/fcm/${account.id}`)
        .set('content-type', 'application/json')
        .send({ fcmToken });
      expect(res.status).to.be.eq(400);
      expect(res.body.message).to.eq('Invalid FCM token provided.');
    });
    it('should return 404 if notification preferences are not found for the accountId', async () => {
      const fcmToken = faker.random.alphaNumeric(32);
      const accountId = faker.database.mongodbObjectId();
      sinonSandbox
        .stub(NotificationReader, 'getAccountNotificationPreferences')
        .resolves(null);
      const res = await chai
        .request(app)
        .post(`/api/notifications/fcm/${accountId}`)
        .set('content-type', 'application/json')
        .send({ fcmToken });
      expect(res.status).to.be.eq(404);
      expect(res.body.message).to.eq(
        new NotificationPreferencesNotFoundError(accountId).message
      );
    });
  });

  describe('PATCH /notifications/fcm/:accountId', () => {
    it('should update FCM token successfully', async () => {
      const fcmToken = faker.random.alphaNumeric(32);
      const res = await chai
        .request(app)
        .patch(`/api/notifications/fcm/${account.id}`)
        .set('content-type', 'application/json')
        .send({ fcmToken });
      expect(res.status).to.be.eq(200);
      expect(res.body.account).to.eq(account.id);
      expect(res.body.fcmToken).to.eq(fcmToken);
    });
    it('should return 400 if fcmToken is missing', async () => {
      const fcmToken: string = null;
      const res = await chai
        .request(app)
        .patch(`/api/notifications/fcm/${account.id}`)
        .set('content-type', 'application/json')
        .send({ fcmToken });
      expect(res.status).to.be.eq(400);
      expect(res.body.message).to.eq('Invalid FCM token provided.');
    });
    it('should return 404 if notification preferences are not found for the accountId', async () => {
      const fcmToken = faker.random.alphaNumeric(32);
      const accountId = faker.database.mongodbObjectId();
      sinonSandbox
        .stub(NotificationReader, 'getAccountNotificationPreferences')
        .resolves(null);
      const res = await chai
        .request(app)
        .patch(`/api/notifications/fcm/${accountId}`)
        .set('content-type', 'application/json')
        .send({ fcmToken });
      expect(res.status).to.be.eq(404);
      expect(res.body.message).to.eq(
        new NotificationPreferencesNotFoundError(accountId).message
      );
    });
  });

  describe('DELETE /notifications/fcm/:accountId', () => {
    it('should delete FCM token successfully', async () => {
      const res = await chai
        .request(app)
        .delete(`/api/notifications/fcm/${account.id}`)
        .set('content-type', 'application/json');
      expect(res.status).to.be.eq(204);
    });
    it('should return 404 if notification preferences are not found for the accountId', async () => {
      const accountId = faker.database.mongodbObjectId();
      sinonSandbox
        .stub(NotificationReader, 'getAccountNotificationPreferences')
        .resolves(null);
      const res = await chai
        .request(app)
        .delete(`/api/notifications/fcm/${accountId}`)
        .set('content-type', 'application/json');
      expect(res.status).to.be.eq(404);
      expect(res.body.message).to.eq(
        new NotificationPreferencesNotFoundError(accountId).message
      );
    });
  });
});
*/
