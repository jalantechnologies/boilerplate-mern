/* eslint-disable @typescript-eslint/no-unsafe-call */
import { expect } from 'chai';
import sinon from 'sinon';
import CommunicationServiceManager from '../../../src/modules/communication/communication-service-manager';
import EmailService from '../../../src/modules/communication/email-service';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import mail from '@sendgrid/mail';
import ConfigService from '../../../src/modules/config/config-service';

chai.use(chaiAsPromised);

let sinonSandbox: sinon.SinonSandbox;

describe('Email Service.', () => {
  const sendgridAPIKey = 'SG.API';
  const twilioAccountCreds = 'ACCOUNT_CREDS';
  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('should not send email, if sender email is invalid.', async () => {
    
    const params = {
      sender: {
        email: 'invalidemail',
        name: 'Sender Name',
      },
      recipient: {
        email: 'another@email.com',
      },
      templateId: '',
      templateData: {},
    };

    const Stub = sinonSandbox
      .stub(ConfigService, 'getStringValue')
    
    Stub.withArgs('sendgridApiKey')
    .returns(sendgridAPIKey);

    Stub.withArgs('twilio.verify.accountSid')
    .returns(twilioAccountCreds);

    Stub.withArgs('twilio.verify.authToken')
    .returns(twilioAccountCreds);

    CommunicationServiceManager.mountService();
    const stub = sinonSandbox.stub(mail, <any>'send').returns(Promise.resolve('1'));

    return expect(EmailService.sendEmail(params)).to.eventually
    .be.rejectedWith('Email cannot be send, please check the params validity.')
    .then((error) => {
      expect(error).to.have.property('code');
      expect(error).to.have.property('failures');
      expect(error.failures.length).to.eq(1);
      expect(error.failures[0].field).to.eq('sender.email');
      expect(stub.calledOnce).to.be.false;
    });
  });

  it('should not send email, if sender name is invalid.', async () => {

    const params = {
      sender: {
        email: 'sender@email.com',
        name: '',
      },
      recipient: {
        email: 'recipient@email.com',
      },
      templateId: '',
      templateData: {},
    };

    const Stub = sinonSandbox
      .stub(ConfigService, 'getStringValue')
    
    Stub.withArgs('sendgridApiKey')
    .returns(sendgridAPIKey);

    Stub.withArgs('twilio.verify.accountSid')
    .returns(twilioAccountCreds);

    Stub.withArgs('twilio.verify.authToken')
    .returns(twilioAccountCreds);

    CommunicationServiceManager.mountService();
    const stub = sinonSandbox.stub(mail, <any>'send').returns(Promise.resolve('1'));

    return expect(EmailService.sendEmail(params)).to.eventually
    .be.rejectedWith('Email cannot be send, please check the params validity.')
    .then((error) => {
      expect(error).to.have.property('code');
      expect(error).to.have.property('failures');
      expect(error.failures.length).to.eq(1);
      expect(error.failures[0].field).to.eq('sender.name');
      expect(stub.calledOnce).to.be.false;
    });
  });

  it('should not send email, if recipient email is invalid.', async () => {

    const params = {
      sender: {
        email: 'sender@email.com',
        name: 'Sender Name',
      },
      recipient: {
        email: 'invalidemail'
      },
      templateId: '',
      templateData: {},
    };

    const Stub = sinonSandbox
      .stub(ConfigService, 'getStringValue')
    
    Stub.withArgs('sendgridApiKey')
    .returns(sendgridAPIKey);

    Stub.withArgs('twilio.verify.accountSid')
    .returns(twilioAccountCreds);

    Stub.withArgs('twilio.verify.authToken')
    .returns(twilioAccountCreds);

    CommunicationServiceManager.mountService();
    const stub = sinonSandbox.stub(mail, <any>'send').returns(Promise.resolve('1'));

    return expect(EmailService.sendEmail(params)).to.eventually
    .be.rejectedWith('Email cannot be send, please check the params validity.')
    .then((error) => {
      expect(error).to.have.property('code');
      expect(error).to.have.property('failures');
      expect(error.failures.length).to.eq(1);
      expect(error.failures[0].field).to.eq('recipient.email');
      expect(stub.calledOnce).to.be.false;
    });
  });

  it('should send email, sender name, sender email, recipient emai are valid.', async () => {

    const params = {
      sender: {
        email: 'sender@email.com',
        name: 'Sender name',
      },
      recipient: {
        email: 'recipient@email.com'
      },
      templateId: '',
      templateData: {},
    };

    const Stub = sinonSandbox
      .stub(ConfigService, 'getStringValue')
    
    Stub.withArgs('sendgridApiKey')
    .returns(sendgridAPIKey);

    Stub.withArgs('twilio.verify.accountSid')
    .returns(twilioAccountCreds);

    Stub.withArgs('twilio.verify.authToken')
    .returns(twilioAccountCreds);

    CommunicationServiceManager.mountService();
    const stub = sinonSandbox.stub(mail, <any>'send').returns(Promise.resolve('1'));
    
    return expect(EmailService.sendEmail(params)).to.be.fulfilled
    .then(() => {
      expect(stub.calledOnce).to.be.true;
    });
  });
});
