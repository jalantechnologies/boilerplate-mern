/*
import { expect } from 'chai';
import admin from 'firebase-admin';
import sinon from 'sinon';

import { ConfigService } from '../../../src/apps/backend/modules/config';
import FcmUtil from '../../../src/apps/backend/modules/notification/fcm-util';

describe('sendPushNotification', () => {
  let firebaseSendStub: sinon.SinonStub;
  beforeEach(() => {
    firebaseSendStub = sinon.stub().resolves('message-id');

    const mockApp = {
      messaging: () => ({
        send: firebaseSendStub,
      }),
    } as unknown as admin.app.App;

    sinon.stub(admin, 'initializeApp').returns(mockApp);
    sinon.stub(admin, 'app').returns(mockApp);
    sinon.stub(FcmUtil, 'getFirebaseApp').returns(mockApp);

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
    return expect(FcmUtil.sendPushNotification(params))
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
    return expect(FcmUtil.sendPushNotification(params))
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
    return expect(FcmUtil.sendPushNotification(params))
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
    return expect(FcmUtil.sendPushNotification(params)).to.be.fulfilled.then(
      () => {
        sinon.assert.calledOnce(firebaseSendStub);
      }
    );
  });
});
*/
