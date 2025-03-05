import mail from '@sendgrid/mail';
import { expect } from 'chai';
import sinon from 'sinon';

import { ConfigService } from '../../../src/apps/backend/modules/config';
import EmailUtil from '../../../src/apps/backend/modules/notification/email-util';

describe('sendEmail', () => {
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

    return expect(EmailUtil.sendEmail(params))
      .to.eventually.be.rejectedWith(
        'Email cannot be send, please check the params validity.'
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

    return expect(EmailUtil.sendEmail(params))
      .to.eventually.be.rejectedWith(
        'Email cannot be send, please check the params validity.'
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

    return expect(EmailUtil.sendEmail(params))
      .to.eventually.be.rejectedWith(
        'Email cannot be send, please check the params validity.'
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

    return expect(EmailUtil.sendEmail(params)).to.be.fulfilled.then(() => {
      sinon.assert.calledOnce(sendgridSend);
    });
  });
});

describe('sendBatchEmail', () => {
  let sendgridSendMultiple: sinon.SinonStub;

  beforeEach(() => {
    sendgridSendMultiple = sinon.stub(mail, 'sendMultiple');
    sendgridSendMultiple.resolves({});

    sinon
      .stub(ConfigService, 'getValue')
      .withArgs('sendgrid.apiKey')
      .returns('random-key');
  });

  it('should not send email when the sender email at any index of the batch is invalid', async () => {
    const params = {
      emails: [
        {
          sender: { email: 'sender@email.com', name: 'Sender Name' },
          recipient: { email: 'recipient1@mail.com' },
          templateId: 'someTemplateId',
        },
        {
          sender: { email: 'invalid_email', name: 'Sender Name' },
          recipient: { email: 'recipient@mail.com' },
          templateId: 'someTemplateId',
        },
      ],
    };
    return expect(EmailUtil.sendBatchEmail(params))
      .to.eventually.be.rejectedWith(
        'Batch email validation failed. Please check the email parameters.'
      )
      .then((error) => {
        expect(error.failures[0].field).to.eq('batch[1].sender.email');
        sinon.assert.notCalled(sendgridSendMultiple);
      });
  });

  it('should not send email when the sender name at any index of the batch is invalid', async () => {
    const params = {
      emails: [
        {
          sender: { email: 'sender@email.com', name: 'Sender Name' },
          recipient: { email: 'recipient1@mail.com' },
          templateId: 'someTemplateId',
        },
        {
          sender: { email: 'sender@email.com', name: '' },
          recipient: { email: 'recipient@mail.com' },
          templateId: 'someTemplateId',
        },
      ],
    };
    return expect(EmailUtil.sendBatchEmail(params))
      .to.eventually.be.rejectedWith(
        'Batch email validation failed. Please check the email parameters.'
      )
      .then((error) => {
        expect(error.failures[0].field).to.eq('batch[1].sender.name');
        sinon.assert.notCalled(sendgridSendMultiple);
      });
  });

  it('should not send email when the recipient email at any index of the batch is invalid', async () => {
    const params = {
      emails: [
        {
          sender: { email: 'sender@email.com', name: 'Sender Name' },
          recipient: { email: 'invalid_email' },
          templateId: 'someTemplateId',
        },
        {
          sender: { email: 'sender@email.com', name: 'Sender Name' },
          recipient: { email: 'recipient@mail.com' },
          templateId: 'someTemplateId',
        },
      ],
    };
    return expect(EmailUtil.sendBatchEmail(params))
      .to.eventually.be.rejectedWith(
        'Batch email validation failed. Please check the email parameters.'
      )
      .then((error) => {
        expect(error.failures[0].field).to.eq('batch[0].recipient.email');
        sinon.assert.notCalled(sendgridSendMultiple);
      });
  });

  it('should send email when all sender name, sender email, recipient email at any index of the batch are valid', async () => {
    const params = {
      emails: [
        {
          sender: { email: 'sender@email.com', name: 'Sender Name' },
          recipient: { email: 'recipient1@gmail.com' },
          templateId: 'someTemplateId',
        },
        {
          sender: { email: 'sender@email.com', name: 'Sender Name' },
          recipient: { email: 'recipient2@gmail.com' },
          templateId: 'someTemplateId',
        },
      ],
    };
    return expect(EmailUtil.sendBatchEmail(params)).to.be.fulfilled.then(() => {
      sinon.assert.calledOnce(sendgridSendMultiple);
    });
  });
});
