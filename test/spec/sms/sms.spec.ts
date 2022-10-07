import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';

import CommunicationServiceManager from '../../../src/apps/backend/modules/communication/communication-service-manager';
import SMSService from '../../../src/apps/backend/modules/communication/sms-service';
import ConfigService from '../../../src/apps/backend/modules/config/config-service';
import TwilioService from '../../../src/apps/backend/modules/communication/internals/twilio-service';

chai.use(chaiAsPromised);

describe('SMS Service', () => {
  let sinonSandbox: sinon.SinonSandbox;
  const sendgridAPIKey = 'SG.API';
  const twilioAccountCreds = 'ACCOUNT_CREDS';

  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('should not send sms when recipient phone number is invalid', async function() {
    const params = {
      recipientPhone: {
        countryCode: '+91',
        phoneNumber: '73001',
      },
      messageBody: 'simple message.',
    };

    const stubVal = sinonSandbox
      .stub(ConfigService, 'getStringValue');

    stubVal.withArgs('sendgridApiKey')
      .returns(sendgridAPIKey);

    stubVal.withArgs('twilio.verify.accountSid')
      .returns(twilioAccountCreds);

    stubVal.withArgs('twilio.verify.authToken')
      .returns(twilioAccountCreds);

    CommunicationServiceManager.mountService();
    const stub = sinonSandbox.stub(TwilioService['twilio'].messages, <any>'create').returns(Promise.resolve('1'));

    return expect(SMSService.sendSMS(params)).to.eventually
      .be.rejectedWith('SMS cannot be send, please check the params validity.')
      .then((error) => {
        expect(error).to.have.property('code');
        expect(error).to.have.property('failures');
        expect(error.failures.length).to.eq(1);
        expect(error.failures[0].field).to.eq('recipientPhone');
        expect(stub.calledOnce).to.be.false;
      });
  });

  it('should not send sms when sms message body is empty', async function() {
    const params = {
      recipientPhone: {
        countryCode: '+91',
        phoneNumber: '7300159158',
      },
      messageBody: '',
    };

    const stubVal = sinonSandbox
      .stub(ConfigService, 'getStringValue');

    stubVal.withArgs('sendgridApiKey')
      .returns(sendgridAPIKey);

    stubVal.withArgs('twilio.verify.accountSid')
      .returns(twilioAccountCreds);

    stubVal.withArgs('twilio.verify.authToken')
      .returns(twilioAccountCreds);

    CommunicationServiceManager.mountService();
    const stub = sinonSandbox.stub(TwilioService['twilio'].messages, <any>'create').returns(Promise.resolve('1'));

    return expect(SMSService.sendSMS(params)).to.eventually
      .be.rejectedWith('SMS cannot be send, please check the params validity.')
      .then((error) => {
        expect(error).to.have.property('code');
        expect(error).to.have.property('failures');
        expect(error.failures.length).to.eq(1);
        expect(error.failures[0].field).to.eq('messageBody');
        expect(stub.calledOnce).to.be.false;
      });
  });

  it('should send sms when recipientPhone and sms message body are correct', async function() {
    const params = {
      recipientPhone: {
        countryCode: '+91',
        phoneNumber: '7300159158',
      },
      messageBody: 'simple message',
    };


    const stubVal = sinonSandbox
      .stub(ConfigService, 'getStringValue');

    stubVal.withArgs('sendgridApiKey')
      .returns(sendgridAPIKey);

    stubVal.withArgs('twilio.verify.accountSid')
      .returns(twilioAccountCreds);

    stubVal.withArgs('twilio.verify.authToken')
      .returns(twilioAccountCreds);

    CommunicationServiceManager.mountService();
    const stub = sinonSandbox.stub(TwilioService['twilio'].messages, <any>'create').returns(Promise.resolve('1'));

    return expect(SMSService.sendSMS(params)).to.be.fulfilled
      .then(() => {
        expect(stub.calledOnce).to.be.true;
      });
  });
});
