import { expect } from 'chai';
import admin from 'firebase-admin';
import sinon from 'sinon';

import { ConfigService } from '../../../src/apps/backend/modules/config';
import PushService from '../../../src/apps/backend/modules/notification/push-service';

describe('sendPushNotification', () => {
  let firebaseSendStub: sinon.SinonStub;
  beforeEach(() => {
    firebaseSendStub = sinon.stub().resolves({ messageId: 'message-id' });

    const mockApp = {
      messaging: () => ({
        send: firebaseSendStub,
      }),
    } as unknown as admin.app.App;

    sinon.stub(admin, 'initializeApp').returns(mockApp);
    sinon.stub(admin, 'app').returns(mockApp);
    sinon.stub(PushService, 'getFirebaseApp').returns(mockApp);

    sinon
      .stub(ConfigService, 'getValue')
      .withArgs('firebase.serviceAccountPath')
      .returns('/path/to/fake/service-account.json');

    sinon.stub(admin, 'messaging').callsFake(() => mockApp.messaging());
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should not send push notification when fcmToken is invalid', async () => {
    const params = {
      fcmToken: '',
      title: 'Notification Title',
      body: 'Notification Body',
    };
    return expect(PushService.sendPushNotification(params))
      .to.eventually.be.rejectedWith(
        'Push notification cannot be sent, please check the params validity.'
      )
      .then((error) => {
        expect(error).to.have.property('code');
        expect(error).to.have.property('failures');
        expect(error.failures.length).to.eq(1);
        expect(error.failures[0].field).to.eq('fcmToken');
        sinon.assert.notCalled(firebaseSendStub);
      });
  });
  it('should not send push notification when title is empty', async () => {
    const params = {
      fcmToken: 'valid_fcm_token',
      title: '',
      body: 'Notification Body',
    };
    return expect(PushService.sendPushNotification(params))
      .to.eventually.be.rejectedWith(
        'Push notification cannot be sent, please check the params validity.'
      )
      .then((error) => {
        expect(error).to.have.property('code');
        expect(error).to.have.property('failures');
        expect(error.failures.length).to.eq(1);
        expect(error.failures[0].field).to.eq('title');
        sinon.assert.notCalled(firebaseSendStub);
      });
  });
  it('should not send push notification when body is empty', async () => {
    const params = {
      fcmToken: 'valid_fcm_token',
      title: 'Notification Title',
      body: '',
    };
    return expect(PushService.sendPushNotification(params))
      .to.eventually.be.rejectedWith(
        'Push notification cannot be sent, please check the params validity.'
      )
      .then((error) => {
        expect(error).to.have.property('code');
        expect(error).to.have.property('failures');
        expect(error.failures.length).to.eq(1);
        expect(error.failures[0].field).to.eq('body');
        sinon.assert.notCalled(firebaseSendStub);
      });
  });
  it('should send push notification when all parameters are valid', async () => {
    const params = {
      fcmToken: 'valid_fcm_token',
      title: 'Notification Title',
      body: 'Notification Body',
    };
    return expect(
      PushService.sendPushNotification(params)
    ).to.be.fulfilled.then(() => {
      sinon.assert.calledOnce(firebaseSendStub);
    });
  });
});
describe('sendBatchPushNotifications', () => {
  let firebaseSendMulticastStub: sinon.SinonStub;
  beforeEach(() => {
    firebaseSendMulticastStub = sinon.stub().resolves({
      successCount: 1,
      failureCount: 0,
      responses: [{ success: true }, { success: true }],
    });

    const mockApp = {
      messaging: () => ({
        sendEachForMulticast: firebaseSendMulticastStub,
      }),
    } as unknown as admin.app.App;

    sinon.stub(admin, 'initializeApp').returns(mockApp);
    sinon.stub(admin, 'app').returns(mockApp);
    sinon.stub(PushService, 'getFirebaseApp').returns(mockApp);

    sinon
      .stub(ConfigService, 'getValue')
      .withArgs('firebase.serviceAccountPath')
      .returns('/path/to/fake/service-account.json');
  });
  afterEach(() => {
    sinon.restore();
  });

  it('should throw error when fcmTokens array is empty', async () => {
    const params = { fcmTokens: [], title: 'Test', body: 'Test body' };
    await expect(
      PushService.sendBatchPushNotifications(params)
    ).to.be.rejectedWith('No FCM tokens provided.');
    sinon.assert.notCalled(firebaseSendMulticastStub);
  });

  it('should send batch push notifications successfully', async () => {
    const params = {
      fcmTokens: ['token1', 'token2'],
      title: 'Batch Test',
      body: 'Batch Test Body',
    };
    await expect(PushService.sendBatchPushNotifications(params)).to.be
      .fulfilled;
    sinon.assert.calledOnce(firebaseSendMulticastStub);
  });
});
