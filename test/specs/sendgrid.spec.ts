require('module-alias/register');
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { Application } from 'express';
import {
  EmailService,
  SendGridService,
  SendGridValidationError
} from '../../src/modules/communication';
import { initApp } from '../helpers/spec-helpers';
chai.use(chaiHttp);
let expressApp: Application;
let sinonSandbox: sinon.SinonSandbox;

describe('Email Service.', function() {
  before(async function() {
    expressApp = await initApp();
    await expressApp.startRESTApiServer();
    sinonSandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sinonSandbox.restore();
  });
  it('should not allow to send email, if to email is invalid.', async function() {
    const params = {
      to: 'invalidemail',
      from: 'from@email.com',
      fromName: 'Sample Name',
      templateId: 'd-bea6fc9b30d34caeb73c11e2770e3287',
      templateData: {},
    };
    sinonSandbox.stub(SendGridService, <any>'sendEmail').returns(Promise.resolve('1'));
    let errorOccured: SendGridValidationError;
    try {
      await EmailService.sendEmail(params);
    } catch(e) {
      errorOccured = e;
      console.log(errorOccured);
    }
    expect(errorOccured.msg).to.eq('Cannot send email, as one or more params are invalid.');
    expect(errorOccured.failures.length).to.eq(1);
    expect(errorOccured.failures[0].field).to.eq('to');
  });
  it('should not allow to send email, if from email is invalid.', async function() {
    const params = {
      to: 'to@email.com',
      from: 'invalidemail',
      fromName: 'Sample Name',
      templateId: 'd-bea6fc9b30d34caeb73c11e2770e3287',
      templateData: {}
    };
    sinonSandbox.stub(SendGridService, <any>'sendEmail').returns(Promise.resolve('1'));
    let errorOccured: SendGridValidationError;
    try {
      await EmailService.sendEmail(params);
    } catch(e) {
      errorOccured = e;
    }
    expect(errorOccured.msg).to.eq('Cannot send email, as one or more params are invalid.');
    expect(errorOccured.failures.length).to.eq(1);
    expect(errorOccured.failures[0].field).to.eq('from');
  });
  it('should not allow to send email, if from name is empty.', async function() {
    const params = {
      to: 'to@email.com',
      from: 'from@email.com',
      fromName: '',
      templateId: 'd-bea6fc9b30d34caeb73c11e2770e3287',
      templateData: {}
    };
    sinonSandbox.stub(SendGridService, <any>'sendEmail').returns(Promise.resolve('1'));
    let errorOccured: SendGridValidationError;
    try {
      await EmailService.sendEmail(params);
    } catch(e) {
      errorOccured = e;
    }
    expect(errorOccured.msg).to.eq('Cannot send email, as one or more params are invalid.');
    expect(errorOccured.failures.length).to.eq(1);
    expect(errorOccured.failures[0].field).to.eq('fromName');
  });
  it('should send email, if all the values are valid.', async function() {
    const params = {
      to: 'to@gmail.com',
      from: 'from@gmail.com',
      fromName: 'Sample Name',
      templateId: 'd-bea6fc9b30d34caeb73c11e2770e3287',
      templateData: {}
    };
    sinonSandbox.stub(SendGridService, <any>'sendEmail').returns(Promise.resolve('1'));
    let errorOccured: SendGridValidationError;
    try {
      await EmailService.sendEmail(params);
    } catch(e) {
      errorOccured = e;
    }
    expect(errorOccured).to.eq(undefined);
  });
});
