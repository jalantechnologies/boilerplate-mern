import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { Server } from 'http';
import sinon from 'sinon';
import { Application } from 'express';
import {
  SMSService,
} from '../../../src/modules';
import initApp from '../../helpers/spec-helpers';

require('module-alias/register');

chai.use(chaiHttp);
let expressApp: Application;
let server: Server;
let sinonSandbox: sinon.SinonSandbox;

describe('SMS Service', () => {
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

  it('should not allow to send sms, if the reciepient phone number is invalid', async () => {
    const params = {
      to: {
        countryCode: '+91',
        phoneNumber: '73001',
      },
      message: 'Sample email.',
    };
    let errorOccured: any;
    try {
      await SMSService.sendSMS(params);
    } catch (e) {
      errorOccured = e;
    }
    expect(errorOccured.msg).to.eq('Sms sent failed, please provide valid params.');
    expect(errorOccured.failures.length).to.eq(1);
    expect(errorOccured.failures[0].field).to.eq('to');
  });

  it('should not allow to send sms, if the message body is empty.', async () => {
    const params = {
      to: {
        countryCode: '+91',
        phoneNumber: '7300159158',
      },
      message: '',
    };
    let errorOccured: any;
    try {
      await SMSService.sendSMS(params);
    } catch (e) {
      errorOccured = e;
    }
    expect(errorOccured.msg).to.eq('Sms sent failed, please provide valid params.');
    expect(errorOccured.failures.length).to.eq(1);
    expect(errorOccured.failures[0].field).to.eq('message');
  });
});
