import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Server } from 'http';
import sinon from 'sinon';
import { Application } from 'express';
import mail from '@sendgrid/mail';
import {
  EmailService,
} from '../../../src/modules';
import initApp from '../../helpers/spec-helpers';

require('module-alias/register');

chai.use(chaiHttp);
let expressApp: Application;
let sinonSandbox: sinon.SinonSandbox;
let server: Server;

describe('Email Service.', () => {
  before(async () => {
    expressApp = await initApp();
    server = await expressApp.startRESTApiServer();
    sinonSandbox = sinon.createSandbox();
  });

  after(() => {
    server.close();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('should not allow to send email, if recipient email is invalid.', async () => {
    const params = {
      recipient: {
        email: 'invalidemail',
      },
      sender: {
        email: 'from@email.com',
        name: 'sample name',
      },
      templateId: 'd-bea6fc9b30d34caeb73c11e2770e3287',
      templateData: {},
    };

    sinonSandbox
      .stub(mail, <any>'send')
      .returns(Promise.resolve('1'));

    let errorOccured: any;
    try {
      await EmailService.sendEmail(params);
    } catch (e) {
      errorOccured = e;
    }

    expect(errorOccured.msg).to.eq('Email sent failed, please provide valid params.');
    expect(errorOccured.failures.length).to.eq(1);
    expect(errorOccured.failures[0].field).to.eq('recipient email');
  });

  it('should not allow to send email, if sender email is invalid.', async () => {
    const params = {
      recipient: {
        email: 'to@email.com',
      },
      sender: {
        email: 'invalidmail',
        name: 'sample name',
      },
      templateId: 'd-bea6fc9b30d34caeb73c11e2770e3287',
      templateData: {},
    };
    sinonSandbox
      .stub(mail, <any>'send')
      .returns(Promise.resolve('1'));

    let errorOccured: any;
    try {
      await EmailService.sendEmail(params);
    } catch (e) {
      errorOccured = e;
    }

    expect(errorOccured.msg).to.eq('Email sent failed, please provide valid params.');
    expect(errorOccured.failures.length).to.eq(1);
    expect(errorOccured.failures[0].field).to.eq('sender email');
  });

  it('should not allow to send email, if sender name is empty.', async () => {
    const params = {
      recipient: {
        email: 'to@email.com',
      },
      sender: {
        email: 'from@email.com',
        name: '',
      },
      templateId: 'd-bea6fc9b30d34caeb73c11e2770e3287',
      templateData: {},
    };
    sinonSandbox
      .stub(mail, <any>'send')
      .returns(Promise.resolve('1'));

    let errorOccured: any;
    try {
      await EmailService.sendEmail(params);
    } catch (e) {
      errorOccured = e;
    }

    expect(errorOccured.msg).to.eq('Email sent failed, please provide valid params.');
    expect(errorOccured.failures.length).to.eq(1);
    expect(errorOccured.failures[0].field).to.eq('sender name');
  });

  it('should send email, if all the values are valid.', async () => {
    const params = {
      recipient: {
        email: 'to@email.com',
      },
      sender: {
        email: 'from@email.com',
        name: 'sample name',
      },
      templateId: 'd-bea6fc9b30d34caeb73c11e2770e3287',
      templateData: {},
    };
    sinonSandbox
      .stub(mail, <any>'send')
      .returns(Promise.resolve('1'));

    let errorOccured: any;
    try {
      await EmailService.sendEmail(params);
    } catch (e) {
      errorOccured = e;
    }

    expect(errorOccured).to.eq(undefined);
  });
});
