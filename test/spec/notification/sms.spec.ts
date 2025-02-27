import { expect } from 'chai';
import sinon from 'sinon';

import { ConfigService } from '../../../src/apps/backend/modules/config';
import { NotificationService } from '../../../src/apps/backend/modules/notification';

describe('sendSMS', () => {
  let twilioCreateMessage: sinon.SinonStub;

  beforeEach(() => {
    sinon
      .stub(ConfigService, 'getValue')
      .withArgs('twilio.verify.accountSid')
      .returns('AC-random-id')
      .withArgs('twilio.verify.authToken')
      .returns('random-token')
      .withArgs('sms.enabled')
      .returns(true);

    // TODO: This needs to be fixed
    twilioCreateMessage = sinon.stub();
    twilioCreateMessage.resolves({
      sid: 'SM1234567',
    });
  });

  it('should not send sms when recipient phone number is invalid', async () => {
    const params = {
      recipientPhone: {
        countryCode: '+91',
        phoneNumber: '73001',
      },
      messageBody: 'simple message.',
    };

    return expect(NotificationService.sendSMS(params))
      .to.eventually.be.rejectedWith(
        'SMS cannot be send, please check the params validity.'
      )
      .then((error) => {
        expect(error).to.have.property('code');
        expect(error).to.have.property('failures');
        expect(error.failures.length).to.eq(1);
        expect(error.failures[0].field).to.eq('recipientPhone');
        sinon.assert.notCalled(twilioCreateMessage);
      });
  });

  it('should not send sms when sms message body is empty', async () => {
    const params = {
      recipientPhone: {
        countryCode: '+91',
        phoneNumber: '7300159158',
      },
      messageBody: '',
    };

    return expect(NotificationService.sendSMS(params))
      .to.eventually.be.rejectedWith(
        'SMS cannot be send, please check the params validity.'
      )
      .then((error) => {
        expect(error).to.have.property('code');
        expect(error).to.have.property('failures');
        expect(error.failures.length).to.eq(1);
        expect(error.failures[0].field).to.eq('messageBody');
        sinon.assert.notCalled(twilioCreateMessage);
      });
  });

  // TODO: This needs to be fixed
  xit('should send sms when recipientPhone and sms message body are correct', async () => {
    const params = {
      recipientPhone: {
        countryCode: '+91',
        phoneNumber: '7300159158',
      },
      messageBody: 'simple message',
    };

    return expect(NotificationService.sendSMS(params)).to.be.fulfilled.then(
      () => {
        sinon.assert.calledOnce(twilioCreateMessage);
      }
    );
  });
});
