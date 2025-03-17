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
  NotificationChannelPreferencesInvalidError,
  NotificationTypePreferencesInvalidError,
  BadRequestError,
  AccountsWithParticularNotificationPreferencesNotFoundError,
} from '../../../src/apps/backend/modules/notification';
import EmailService from '../../../src/apps/backend/modules/notification/email-service';
import NotificationReader from '../../../src/apps/backend/modules/notification/internal/notification-reader';
import PushService from '../../../src/apps/backend/modules/notification/push-service';
import { createAccount } from '../../helpers/account';
import { app } from '../../helpers/app';

describe('Notification Module', () => {
  let sinonSandbox: sinon.SinonSandbox;
  let account: Account;

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

    sinonSandbox
      .stub(ConfigService, 'getValue')
      .withArgs('mailer.notificationMailTemplateId')
      .returns('random-template-id')
      .withArgs('sendgrid.apiKey')
      .returns('SG.random-key')
      .withArgs('twilio.verify.accountSid')
      .returns('AC.random-id')
      .withArgs('twilio.verify.authToken')
      .returns('random-token')
      .withArgs('sms.enabled')
      .returns(true)
      .withArgs('firebase.serviceAccountPath')
      .returns('./sample-firebase.json');
  });

  afterEach(async () => {
    sinonSandbox.restore();
    if (account?.id) {
      await AccountRepository.deleteOne({
        _id: account.id,
      });
    }
  });

  describe('PATCH /notifications/:accountId/preferences', () => {
    it('should update notification channel preferences successfully', async () => {
      const newPreferences = {
        email: false,
      };
      const updateNotificationPreferenceParams = {
        notificationChannelPreferences: newPreferences,
      };
      const res = await chai
        .request(app)
        .patch(`/api/notifications/${account.id}/preferences`)
        .set('content-type', 'application/json')
        .send(updateNotificationPreferenceParams);

      expect(res.status).to.be.eq(200);
      expect(res.body.account).to.eq(account.id);
      expect(res.body.notificationChannelPreferences.email).to.eq(
        newPreferences.email
      );
    });
    it('should throw an error when updating notification channel preferences with an account ID that does not exist', async () => {
      const accountId = faker.database.mongodbObjectId();
      const newPreferences = {
        email: false,
      };
      const updateNotificationPreferenceParams = {
        notificationChannelPreferences: newPreferences,
      };

      const res = await chai
        .request(app)
        .patch(`/api/notifications/${accountId}/preferences`)
        .set('content-type', 'application/json')
        .send(updateNotificationPreferenceParams);

      expect(res.status).to.be.eq(404);
      expect(res.body.message).to.eq(
        new NotificationPreferencesNotFoundError(accountId).message
      );
    });
    it('should throw an error when updating with invalid notification channel preferences', async () => {
      const invalidPreferences = {
        invalidType: true,
      };
      const updateNotificationPreferenceParams = {
        notificationChannelPreferences: invalidPreferences,
      };
      const res = await chai
        .request(app)
        .patch(`/api/notifications/${account.id}/preferences`)
        .set('content-type', 'application/json')
        .send(updateNotificationPreferenceParams);
      expect(res.status).to.be.eq(400);
      expect(res.body.message).to.eq(
        new NotificationChannelPreferencesInvalidError().message
      );
    });
  });
  describe('PATCH /notifications/:accountId/notification-types', () => {
    it('should update notification type preferences successfully', async () => {
      const newPreferences = {
        promotional: false,
      };
      const updateNotificationPreferenceParams = {
        notificationTypePreferences: newPreferences,
      };
      const res = await chai
        .request(app)
        .patch(`/api/notifications/${account.id}/notification-types`)
        .set('content-type', 'application/json')
        .send(updateNotificationPreferenceParams);

      expect(res.status).to.be.eq(200);
      expect(res.body.account).to.eq(account.id);
      expect(res.body.notificationTypePreferences.promotional).to.eq(
        newPreferences.promotional
      );
    });
    it('should throw an error when updating notification type preferences with an account ID that does not exist', async () => {
      const accountId = faker.database.mongodbObjectId();
      const newPreferences = {
        promotional: false,
      };
      const updateNotificationPreferenceParams = {
        notificationTypePreferences: newPreferences,
      };

      const res = await chai
        .request(app)
        .patch(`/api/notifications/${accountId}/notification-types`)
        .set('content-type', 'application/json')
        .send(updateNotificationPreferenceParams);

      expect(res.status).to.be.eq(404);
      expect(res.body.message).to.eq(
        new NotificationPreferencesNotFoundError(accountId).message
      );
    });
    it('should throw an error when updating with invalid notification type preferences', async () => {
      const newPreferences = {
        invalidType: false,
      };
      const updateNotificationPreferenceParams = {
        notificationTypePreferences: newPreferences,
      };
      const res = await chai
        .request(app)
        .patch(`/api/notifications/${account.id}/notification-types`)
        .set('content-type', 'application/json')
        .send(updateNotificationPreferenceParams);
      expect(res.status).to.be.eq(400);
      expect(res.body.message).to.eq(
        new NotificationTypePreferencesInvalidError().message
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
      expect(res.body.fcmTokens).to.include(fcmToken);
    });
    it('should return 400 if fcmToken is invalid', async () => {
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
  describe('DELETE /notifications/fcm/:accountId', () => {
    it('should change the push notifcation channel preference to false', async () => {
      const res = await chai
        .request(app)
        .delete(`/api/notifications/fcm/${account.id}`)
        .set('content-type', 'application/json');
      expect(res.status).to.be.eq(204);
      const accountNotificationPreferences =
        await NotificationService.getAccountNotificationPreference({
          accountId: account.id,
        });
      expect(accountNotificationPreferences.notificationChannelPreferences.push)
        .to.be.false;
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
  describe('sendEmailNotificationToAccount', () => {
    it('should send email notification successfully to account', async () => {
      const params = {
        accountId: account.id,
        content: 'Test notification email content',
        notificationType: 'update',
      };
      const sendEmailStub = sinonSandbox
        .stub(NotificationService, 'sendEmail')
        .resolves();
      await NotificationService.sendEmailNotificationToAccount(params);
      expect(sendEmailStub.calledOnce).to.be.true;
    });
    it('should return 400 if notification type is invalid', async () => {
      const accountId = account.id;
      const content = 'Test notification email content';
      const notificationType = 'invalid';

      await expect(
        NotificationService.sendEmailNotificationToAccount({
          accountId,
          content,
          notificationType,
        })
      ).to.be.rejectedWith(NotificationTypePreferencesInvalidError);
    });
    it('should return 404 if notification preferences are not found', async () => {
      const accountId = faker.database.mongodbObjectId();
      const params = {
        accountId,
        content: 'Test notification email content',
        notificationType: 'update',
      };

      sinonSandbox
        .stub(NotificationReader, 'getAccountNotificationPreferences')
        .resolves(null);

      await expect(
        NotificationService.sendEmailNotificationToAccount(params)
      ).to.be.rejectedWith(
        NotificationPreferencesNotFoundError,
        `Notification preferences for accountId ${accountId} not found.`
      );
    });
    it('should return 400 if email notifications are disabled for the account', async () => {
      const accountId = faker.database.mongodbObjectId();
      const content = 'Test email content';
      const notificationType = 'transactional';

      sinonSandbox
        .stub(NotificationReader, 'getAccountNotificationPreferences')
        .resolves({
          id: faker.database.mongodbObjectId(),
          account: accountId,
          notificationChannelPreferences: {
            email: false,
            sms: true,
            push: true,
          },
          notificationTypePreferences: {
            transactional: true,
            promotional: true,
            update: true,
            security: true,
            reminder: true,
            social: true,
            alert: true,
          },
          fcmTokens: [],
        });

      await expect(
        NotificationService.sendEmailNotificationToAccount({
          accountId,
          content,
          notificationType,
        })
      ).to.be.rejectedWith('Notification Permission denied');
    });
    it('should return 400 if that particular notifcation type is disabled for the account', async () => {
      const accountId = faker.database.mongodbObjectId();
      const content = 'Test email content';
      const notificationType = 'social';

      sinonSandbox
        .stub(NotificationReader, 'getAccountNotificationPreferences')
        .resolves({
          id: faker.database.mongodbObjectId(),
          account: accountId,
          notificationChannelPreferences: {
            email: true,
            sms: true,
            push: true,
          },
          notificationTypePreferences: {
            transactional: true,
            promotional: true,
            update: true,
            security: true,
            reminder: true,
            social: false,
            alert: true,
          },
          fcmTokens: [],
        });

      await expect(
        NotificationService.sendEmailNotificationToAccount({
          accountId,
          content,
          notificationType,
        })
      ).to.be.rejectedWith('Notification Permission denied');
    });
    it('should return 400 if no valid email is found for the account', async () => {
      const accountId = account.id;
      const content = 'Test email content';
      const notificationType = 'transactional';

      sinonSandbox.stub(AccountService, 'getAccountById').resolves({
        id: accountId,
        username: null,
        phoneNumber: account.phoneNumber,
        firstName: account.firstName,
        lastName: account.lastName,
        hashedPassword: account.hashedPassword,
      });

      await expect(
        NotificationService.sendEmailNotificationToAccount({
          accountId,
          content,
          notificationType,
        })
      ).to.be.rejectedWith(
        BadRequestError,
        `No valid email found for accountId ${accountId}`
      );
    });
  });
  describe('sendEmailNotificationToGroup', () => {
    it('should send email notification successfully to group of accounts', async () => {
      const params = {
        accountIds: [account.id],
        content: 'Test notification email content',
        notificationType: 'update',
      };

      const sendEmailStub = sinonSandbox
        .stub(EmailService, 'sendBatchEmail')
        .resolves();
      const result =
        await NotificationService.sendEmailNotificationToGroup(params);
      expect(sendEmailStub.calledOnce).to.be.true;
      expect(result.unsuccessful).to.be.an('array').that.is.empty;
    });
    it('should return 400 if notification type is invalid', async () => {
      const accountIds = [account.id];
      const params = {
        accountIds,
        content: 'Group email notification test',
        notificationType: 'invalidType',
      };

      await expect(
        NotificationService.sendEmailNotificationToGroup(params)
      ).to.be.rejectedWith(NotificationTypePreferencesInvalidError);
    });
    it('should add accountId to unsuccessful array if notification preferences are invalid', async () => {
      const accountIds = [account.id];
      const params = {
        accountIds,
        content: 'Group email notification test',
        notificationType: 'update',
      };

      sinonSandbox
        .stub(NotificationReader, 'getAccountNotificationPreferences')
        .resolves(null);

      const sendEmailStub = sinonSandbox
        .stub(EmailService, 'sendBatchEmail')
        .resolves();
      const result =
        await NotificationService.sendEmailNotificationToGroup(params);
      expect(result.unsuccessful).to.include(account.id);
      expect(sendEmailStub.called).to.be.false;
    });
    it('should add accountId to unsuccessful array if account does not have a username', async () => {
      const accountIds = [account.id];
      const params = {
        accountIds,
        content: 'Group email notification test',
        notificationType: 'update',
      };

      sinonSandbox.stub(AccountService, 'getAccountById').resolves({
        id: account.id,
        username: null,
        phoneNumber: account.phoneNumber,
        firstName: account.firstName,
        lastName: account.lastName,
        hashedPassword: account.hashedPassword,
      });

      const sendEmailStub = sinonSandbox
        .stub(EmailService, 'sendBatchEmail')
        .resolves();
      const result =
        await NotificationService.sendEmailNotificationToGroup(params);
      expect(result.unsuccessful).to.include(account.id);
      expect(sendEmailStub.called).to.be.false;
    });
  });
  describe('sendEmailNotificationToAllAccounts', () => {
    it('should call sendEmailNotificationToGroup with filtered account IDs', async () => {
      const params = {
        content: 'Test notification email content',
        notificationType: 'update',
      };

      const accountIdsWithEmailNotificationEnabled = [
        account.id,
        faker.database.mongodbObjectId(),
      ];
      const accountsWithNotificationTypeEnabled = [account.id];

      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationChannelPreferences'
        )
        .resolves(accountIdsWithEmailNotificationEnabled);

      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationTypePreferences'
        )
        .resolves(accountsWithNotificationTypeEnabled);

      const sendEmailGroupStub = sinonSandbox
        .stub(NotificationService, 'sendEmailNotificationToGroup')
        .resolves({ unsuccessful: [] });

      await NotificationService.sendEmailNotificationToAll(params);

      expect(
        sendEmailGroupStub.calledOnceWith({
          accountIds: [account.id],
          content: params.content,
          notificationType: params.notificationType,
        })
      ).to.be.true;
    });
    it('should return 400 if notification type is invalid', async () => {
      const params = {
        content: 'Test notification email content',
        notificationType: 'invalidType',
      };

      await expect(
        NotificationService.sendEmailNotificationToAll(params)
      ).to.be.rejectedWith(NotificationTypePreferencesInvalidError);
    });
    it('should return 404 if no accounts have email notifications enabled', async () => {
      const params = {
        content: 'Test notification email content',
        notificationType: 'update',
      };

      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationChannelPreferences'
        )
        .resolves([]);
      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationTypePreferences'
        )
        .resolves([]);

      await expect(
        NotificationService.sendEmailNotificationToAll(params)
      ).to.be.rejectedWith(
        AccountsWithParticularNotificationPreferencesNotFoundError
      );
    });
  });
  describe('sendSmsNotificationToAccount', () => {
    it('should send SMS notification successfully to account', async () => {
      const params = {
        accountId: account.id,
        content: 'Test SMS notification',
        notificationType: 'update',
      };

      const sendSmsStub = sinonSandbox
        .stub(NotificationService, 'sendSMS')
        .resolves();
      sinonSandbox.stub(AccountService, 'getAccountById').resolves(account);

      await NotificationService.sendSmsNotificationToAccount(params);

      expect(sendSmsStub.calledOnce).to.be.true;
    });
    it('should return 400 if notification type is invalid', async () => {
      const accountId = account.id;
      const content = 'Test SMS notification';
      const notificationType = 'invalid';

      await expect(
        NotificationService.sendSmsNotificationToAccount({
          accountId,
          content,
          notificationType,
        })
      ).to.be.rejectedWith(NotificationTypePreferencesInvalidError);
    });
    it('should return 404 if notification preferences are not found', async () => {
      const accountId = faker.database.mongodbObjectId();
      const params = {
        accountId,
        content: 'Test SMS notification',
        notificationType: 'update',
      };

      sinonSandbox
        .stub(NotificationReader, 'getAccountNotificationPreferences')
        .resolves(null);

      await expect(
        NotificationService.sendSmsNotificationToAccount(params)
      ).to.be.rejectedWith(
        NotificationPreferencesNotFoundError,
        `Notification preferences for accountId ${accountId} not found.`
      );
    });
    it('should return 400 if SMS notifications are disabled for the account', async () => {
      const accountId = faker.database.mongodbObjectId();
      const content = 'Test SMS notification';
      const notificationType = 'transactional';

      sinonSandbox
        .stub(NotificationReader, 'getAccountNotificationPreferences')
        .resolves({
          id: faker.database.mongodbObjectId(),
          account: accountId,
          notificationChannelPreferences: {
            email: true,
            sms: false,
            push: true,
          },
          notificationTypePreferences: {
            transactional: true,
            promotional: true,
            update: true,
            security: true,
            reminder: true,
            social: true,
            alert: true,
          },
          fcmTokens: [],
        });

      await expect(
        NotificationService.sendSmsNotificationToAccount({
          accountId,
          content,
          notificationType,
        })
      ).to.be.rejectedWith('Notification Permission denied');
    });
    it('should return 400 if that particular notifcation type is disabled for the account', async () => {
      const accountId = faker.database.mongodbObjectId();
      const content = 'Test SMS notification';
      const notificationType = 'social';

      sinonSandbox
        .stub(NotificationReader, 'getAccountNotificationPreferences')
        .resolves({
          id: faker.database.mongodbObjectId(),
          account: accountId,
          notificationChannelPreferences: {
            email: true,
            sms: true,
            push: true,
          },
          notificationTypePreferences: {
            transactional: true,
            promotional: true,
            update: true,
            security: true,
            reminder: true,
            social: false,
            alert: true,
          },
          fcmTokens: [],
        });

      await expect(
        NotificationService.sendSmsNotificationToAccount({
          accountId,
          content,
          notificationType,
        })
      ).to.be.rejectedWith('Notification Permission denied');
    });
    it('should return 400 if no valid phone number is found for the account', async () => {
      const accountId = account.id;
      const content = 'Test SMS notification';
      const notificationType = 'transactional';

      sinonSandbox.stub(AccountService, 'getAccountById').resolves({
        id: accountId,
        username: account.username,
        phoneNumber: null,
        firstName: account.firstName,
        lastName: account.lastName,
        hashedPassword: account.hashedPassword,
      });

      await expect(
        NotificationService.sendSmsNotificationToAccount({
          accountId,
          content,
          notificationType,
        })
      ).to.be.rejectedWith(
        BadRequestError,
        `No valid phone number found for accountId ${accountId}`
      );
    });
  });
  describe('sendSmsNotificationToGroup', () => {
    it('should send SMS notifications successfully to a group of accounts', async () => {
      const params = {
        accountIds: [account.id],
        content: 'Group SMS notification test',
        notificationType: 'update',
      };

      const sendSmsStub = sinonSandbox
        .stub(NotificationService, 'sendSMS')
        .resolves();
      sinonSandbox.stub(AccountService, 'getAccountById').resolves(account);

      const result =
        await NotificationService.sendSmsNotificationToGroup(params);
      expect(sendSmsStub.called).to.be.true;
      expect(result.unsuccessful).to.be.an('array').that.is.empty;
    });
    it('should return 400 if notification type is invalid', async () => {
      const params = {
        accountIds: [account.id],
        content: 'Group SMS notification test',
        notificationType: 'invalidType',
      };

      await expect(
        NotificationService.sendSmsNotificationToGroup(params)
      ).to.be.rejectedWith(NotificationTypePreferencesInvalidError);
    });
    it('should add accountId to unsuccessful array if notification preferences are invalid', async () => {
      const params = {
        accountIds: [account.id],
        content: 'Group SMS notification test',
        notificationType: 'update',
      };

      sinonSandbox
        .stub(NotificationReader, 'getAccountNotificationPreferences')
        .resolves(null);

      const sendSMSStub = sinonSandbox
        .stub(NotificationService, 'sendSMS')
        .resolves();
      const result =
        await NotificationService.sendSmsNotificationToGroup(params);
      expect(result.unsuccessful).to.include(account.id);
      expect(sendSMSStub.called).to.be.false;
    });
    it('should add accountId to unsuccessful array if the account does not have a phone number', async () => {
      const params = {
        accountIds: [account.id],
        content: 'Group SMS notification test',
        notificationType: 'update',
      };

      sinonSandbox.stub(AccountService, 'getAccountById').resolves({
        id: account.id,
        username: account.username,
        phoneNumber: null,
        firstName: account.firstName,
        lastName: account.lastName,
        hashedPassword: account.hashedPassword,
      });

      const sendSMSStub = sinonSandbox
        .stub(NotificationService, 'sendSMS')
        .resolves();
      const result =
        await NotificationService.sendSmsNotificationToGroup(params);
      expect(result.unsuccessful).to.include(account.id);
      expect(sendSMSStub.called).to.be.false;
    });
  });
  describe('sendSmsNotificationToAllAccounts', () => {
    it('should call sendSmsNotificationToGroup with filtered account IDs', async () => {
      const params = {
        content: 'Test notification SMS content',
        notificationType: 'update',
      };

      const accountIdsWithSmsNotificationEnabled = [
        account.id,
        faker.database.mongodbObjectId(),
      ];
      const accountsWithNotificationTypeEnabled = [account.id];

      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationChannelPreferences'
        )
        .resolves(accountIdsWithSmsNotificationEnabled);

      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationTypePreferences'
        )
        .resolves(accountsWithNotificationTypeEnabled);

      const sendSmsGroupStub = sinonSandbox
        .stub(NotificationService, 'sendSmsNotificationToGroup')
        .resolves({ unsuccessful: [] });

      await NotificationService.sendSmsNotificationToAll(params);

      expect(
        sendSmsGroupStub.calledOnceWith({
          accountIds: [account.id],
          content: params.content,
          notificationType: params.notificationType,
        })
      ).to.be.true;
    });
    it('should return 400 if notification type is invalid', async () => {
      const params = {
        content: 'Test notification SMS content',
        notificationType: 'invalidType',
      };

      await expect(
        NotificationService.sendSmsNotificationToAll(params)
      ).to.be.rejectedWith(NotificationTypePreferencesInvalidError);
    });
    it('should return 404 if no accounts have SMS notifications enabled', async () => {
      const params = {
        content: 'Test notification SMS content',
        notificationType: 'update',
      };

      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationChannelPreferences'
        )
        .resolves([]);

      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationTypePreferences'
        )
        .resolves([]);

      await expect(
        NotificationService.sendSmsNotificationToAll(params)
      ).to.be.rejectedWith(
        AccountsWithParticularNotificationPreferencesNotFoundError
      );
    });
  });
  describe('sendPushNotificationToGroup', () => {
    it('should send push notifications successfully to a group of accounts', async () => {
      const params = {
        accountIds: [account.id],
        title: 'Test Push Notification',
        body: 'Group push notification test',
        notificationType: 'update',
      };

      const sendPushStub = sinonSandbox
        .stub(PushService, 'sendBatchPushNotifications')
        .resolves();
      sinonSandbox
        .stub(NotificationReader, 'getAccountNotificationPreferences')
        .resolves({
          id: faker.database.mongodbObjectId(),
          account: account.id,
          notificationChannelPreferences: {
            email: true,
            sms: true,
            push: true,
          },
          notificationTypePreferences: {
            transactional: true,
            promotional: true,
            update: true,
            security: true,
            reminder: true,
            social: true,
            alert: true,
          },
          fcmTokens: ['valid_fcm_token'],
        });

      const result =
        await NotificationService.sendPushNotificationToGroup(params);

      expect(sendPushStub.calledOnce).to.be.true;
      expect(result.unsuccessfulTokens).to.be.an('array').that.is.empty;
    });
    it('should return 400 if notification type is invalid', async () => {
      const params = {
        accountIds: [account.id],
        title: 'Test Push Notification',
        body: 'Group push notification test',
        notificationType: 'invalidType',
      };

      await expect(
        NotificationService.sendPushNotificationToGroup(params)
      ).to.be.rejectedWith(NotificationTypePreferencesInvalidError);
    });
    it('should add accountId to unsuccessful array if notification preferences are invalid', async () => {
      const params = {
        accountIds: [account.id],
        title: 'Test Push Notification',
        body: 'Group push notification test',
        notificationType: 'update',
      };

      sinonSandbox
        .stub(NotificationReader, 'getAccountNotificationPreferences')
        .resolves(null);

      const sendPushStub = sinonSandbox
        .stub(PushService, 'sendBatchPushNotifications')
        .resolves();
      const result =
        await NotificationService.sendPushNotificationToGroup(params);

      expect(result.accountsWithNotificationPreferencesDisabled).to.include(
        account.id
      );
      expect(sendPushStub.called).to.be.false;
    });
    it('should add accountId to unsuccessful array if push notifications are disabled for the account', async () => {
      const params = {
        accountIds: [account.id],
        title: 'Test Push Notification',
        body: 'Group push notification test',
        notificationType: 'update',
      };

      sinonSandbox
        .stub(NotificationReader, 'getAccountNotificationPreferences')
        .resolves({
          id: faker.database.mongodbObjectId(),
          account: account.id,
          notificationChannelPreferences: {
            email: true,
            sms: true,
            push: false,
          },
          notificationTypePreferences: {
            transactional: true,
            promotional: true,
            update: true,
            security: true,
            reminder: true,
            social: true,
            alert: true,
          },
          fcmTokens: ['valid_fcm_token'],
        });

      const sendPushStub = sinonSandbox
        .stub(PushService, 'sendBatchPushNotifications')
        .resolves();
      const result =
        await NotificationService.sendPushNotificationToGroup(params);

      expect(result.accountsWithNotificationPreferencesDisabled).to.include(
        account.id
      );
      expect(sendPushStub.called).to.be.false;
    });
    it('should add accountId to unsuccessful array if the account has no valid FCM tokens', async () => {
      const params = {
        accountIds: [account.id],
        title: 'Test Push Notification',
        body: 'Group push notification test',
        notificationType: 'update',
      };

      sinonSandbox
        .stub(NotificationReader, 'getAccountNotificationPreferences')
        .resolves({
          id: faker.database.mongodbObjectId(),
          account: account.id,
          notificationChannelPreferences: {
            email: true,
            sms: true,
            push: true,
          },
          notificationTypePreferences: {
            transactional: true,
            promotional: true,
            update: true,
            security: true,
            reminder: true,
            social: true,
            alert: true,
          },
          fcmTokens: [],
        });

      const sendPushStub = sinonSandbox
        .stub(PushService, 'sendBatchPushNotifications')
        .resolves();
      const result =
        await NotificationService.sendPushNotificationToGroup(params);

      expect(result.accountsWithNotificationPreferencesDisabled).to.include(
        account.id
      );
      expect(sendPushStub.called).to.be.false;
    });
  });
  describe('sendPushNotificationToAll', () => {
    it('should call sendPushNotificationToGroup with filtered account IDs', async () => {
      const params = {
        title: 'Test Push Notification',
        body: 'Push notification test for all',
        notificationType: 'update',
      };

      const accountIdsWithPushNotificationEnabled = [
        account.id,
        faker.database.mongodbObjectId(),
      ];
      const accountsWithNotificationTypeEnabled = [account.id];

      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationChannelPreferences'
        )
        .resolves(accountIdsWithPushNotificationEnabled);

      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationTypePreferences'
        )
        .resolves(accountsWithNotificationTypeEnabled);

      const sendPushGroupStub = sinonSandbox
        .stub(NotificationService, 'sendPushNotificationToGroup')
        .resolves({
          response: {
            successCount: 1,
            failureCount: 0,
            responses: [{ success: true }, { success: true }],
          },
          unsuccessfulTokens: [],
          accountsWithNotificationPreferencesDisabled: [],
        });

      await NotificationService.sendPushNotificationToAll(params);

      expect(
        sendPushGroupStub.calledOnceWith({
          accountIds: [account.id],
          title: params.title,
          body: params.body,
          notificationType: params.notificationType,
        })
      ).to.be.true;
    });
    it('should return 400 if notification type is invalid', async () => {
      const params = {
        title: 'Test Push Notification',
        body: 'Push notification test for all',
        notificationType: 'invalidType',
      };

      await expect(
        NotificationService.sendPushNotificationToAll(params)
      ).to.be.rejectedWith(NotificationTypePreferencesInvalidError);
    });
    it('should return 404 if no accounts have push notifications enabled', async () => {
      const params = {
        title: 'Test Push Notification',
        body: 'Push notification test for all',
        notificationType: 'update',
      };

      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationChannelPreferences'
        )
        .resolves([]);

      sinonSandbox
        .stub(
          NotificationService,
          'getAccountsWithParticularNotificationTypePreferences'
        )
        .resolves([]);

      await expect(
        NotificationService.sendPushNotificationToAll(params)
      ).to.be.rejectedWith(
        AccountsWithParticularNotificationPreferencesNotFoundError
      );
    });
  });
});
