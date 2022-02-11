/* eslint-disable @typescript-eslint/no-unsafe-call */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import sinon from 'sinon';
import AccountServiceManager from '../../../src/modules/account/account-service-manager';
import { AccountWithUserNameExistsError } from '../../../src/modules/account/types';

chai.use(chaiHttp);

let sinonSandbox: sinon.SinonSandbox;

let app: any;

// TODO: Enable after docker integration
describe.skip('Account Service', () => {
  before(async () => {
    const server = await AccountServiceManager.createRestAPIServer();
    app = express();
    app.use('/', server);
  });

  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('POST /account should create a new account', async () => {
    const params = { username: 'useranme', password: 'password' };
    const res = await chai
      .request(app)
      .post('/accounts')
      .set('content-type', 'application/json')
      .send(params);

    expect(res.body.useranme).to.eq(params.username);
  });

  it('POST /account should throw if account with username already exists', async () => {
    const params = { username: 'useranme', password: 'password' };
    const res = await chai
      .request(app)
      .post('/accounts')
      .set('content-type', 'application/json')
      .send(params);

    expect(res.body.error).to.eq(
      new AccountWithUserNameExistsError(params.username).message,
    );
  });
});
