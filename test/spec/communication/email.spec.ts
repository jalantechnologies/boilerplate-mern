import mail from '@sendgrid/mail';
import { expect } from 'chai';
import sinon from 'sinon';

import EmailService from '../../../src/apps/backend/modules/communication/email-service';
import { ConfigService } from '../../../src/apps/backend/modules/config';

describe('EmailService', () => {
  let sendgridSend: sinon.SinonStub;

  beforeEach(() => {
    sendgridSend = sinon.stub(mail, 'send');
    sendgridSend.resolves({});

    sinon
      .stub(ConfigService, 'getValue')
      .withArgs('sendgrid.apiKey')
      .returns('random-key');
  });

  it('should not send email when sender email is invalid', async () => {
    const params = {
      sender: {
        email: 'some_invalid_email',
        name: 'Sender Name',
      },
      recipient: {
        email: 'another@email.com',
      },
      templateId: 'someTemplateId',
    };

    return expect(EmailService.sendEmail(params))
      .to.eventually.be.rejectedWith(
        'Email cannot be send, please check the params validity.',
      )
      .then((error) => {
        expect(error).to.have.property('code');
        expect(error).to.have.property('failures');
        expect(error.failures.length).to.eq(1);
        expect(error.failures[0].field).to.eq('sender.email');
        sinon.assert.notCalled(sendgridSend);
      });
  });

  it('should not send email when sender name is invalid', async () => {
    const params = {
      sender: {
        email: 'sender@email.com',
        name: '',
      },
      recipient: {
        email: 'recipient@email.com',
      },
      templateId: '',
    };

    return expect(EmailService.sendEmail(params))
      .to.eventually.be.rejectedWith(
        'Email cannot be send, please check the params validity.',
      )
      .then((error) => {
        expect(error).to.have.property('code');
        expect(error).to.have.property('failures');
        expect(error.failures.length).to.eq(1);
        expect(error.failures[0].field).to.eq('sender.name');
        sinon.assert.notCalled(sendgridSend);
      });
  });

  it('should not send email when recipient email is invalid', async () => {
    const params = {
      sender: {
        email: 'sender@email.com',
        name: 'Sender Name',
      },
      recipient: {
        email: 'some_invalid_email',
      },
      templateId: '',
    };

    return expect(EmailService.sendEmail(params))
      .to.eventually.be.rejectedWith(
        'Email cannot be send, please check the params validity.',
      )
      .then((error) => {
        expect(error).to.have.property('code');
        expect(error).to.have.property('failures');
        expect(error.failures.length).to.eq(1);
        expect(error.failures[0].field).to.eq('recipient.email');
        sinon.assert.notCalled(sendgridSend);
      });
  });

  it('should send email when sender name, sender email, recipient email are valid', async () => {
    const params = {
      sender: {
        email: 'sender@email.com',
        name: 'Sender name',
      },
      recipient: {
        email: 'recipient@email.com',
      },
      templateId: '',
      templateData: {},
    };

    return expect(EmailService.sendEmail(params)).to.be.fulfilled.then(() => {
      sinon.assert.calledOnce(sendgridSend);
    });
  });
});
