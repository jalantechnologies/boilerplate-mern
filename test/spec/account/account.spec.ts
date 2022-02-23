/* eslint-disable @typescript-eslint/no-unsafe-call */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import AccountWriter from '../../../src/modules/account/internal/account-writer';
import AccountRepository from '../../../src/modules/account/internal/store/account-repository';
import { AccountWithUserNameExistsError } from '../../../src/modules/account/types';
import { app } from '../helpers/helper.spec';

chai.use(chaiHttp);

let sinonSandbox: sinon.SinonSandbox;

describe('Account Service', () => {
  beforeEach(async () => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('POST /account should create a new account', async () => {
    const params = { username: 'username', password: 'password' };
    const res = await chai
      .request(app)
      .post('/api/accounts')
      .set('content-type', 'application/json')
      .send(params);

    expect(res.body.username).to.eq(params.username);
    await AccountRepository.accountDB.deleteOne({ username: params.username });
  });

  it('POST /account should throw if account with username already exists', async () => {
    const params = { username: 'name', password: 'password' };
    await AccountWriter.createAccount(params);
    const res = await chai
      .request(app)
      .post('/api/accounts')
      .set('content-type', 'application/json')
      .send(params);

    expect(res.body.message).to.eq(
      new AccountWithUserNameExistsError(params.username).message,
    );
    await AccountRepository.accountDB.deleteOne({ username: params.username });
  });
});
