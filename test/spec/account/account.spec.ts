/* eslint-disable @typescript-eslint/no-unsafe-call */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import sinon from 'sinon';
import serverErrorHandler from '../../../src/error-handler';
import AccountServiceManager from '../../../src/modules/account/account-service-manager';
import AccountWriter from '../../../src/modules/account/internal/account-writer';
import AccountRepository from '../../../src/modules/account/internal/store/account-repository';
import { AccountWithUserNameExistsError } from '../../../src/modules/account/types';
import Loggers from '../../../src/modules/logger/internals/loggers';

chai.use(chaiHttp);

let sinonSandbox: sinon.SinonSandbox;

let app: any;

describe('Account Service', () => {
  before(async () => {
    const server = await AccountServiceManager.createRestAPIServer();
    app = express();
    app.use('/', server);
    app.use(serverErrorHandler);
    Loggers.initializeLoggers();
  });

  beforeEach(async () => {
    sinonSandbox = sinon.createSandbox();
    await AccountRepository.accountDB.deleteMany();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('POST /account should create a new account', async () => {
    const params = { username: 'username', password: 'password' };
    const res = await chai
      .request(app)
      .post('/accounts')
      .set('content-type', 'application/json')
      .send(params);

    expect(res.body.username).to.eq(params.username);
  });

  it('POST /account should throw if account with username already exists', async () => {
    const params = { username: 'name', password: 'password' };
    await AccountWriter.createAccount(params);
    const res = await chai
      .request(app)
      .post('/accounts')
      .set('content-type', 'application/json')
      .send(params);

    expect(res.body.message).to.eq(
      new AccountWithUserNameExistsError(params.username).message,
    );
  });
});
