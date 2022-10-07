import faker from '@faker-js/faker';
import chai, { expect } from 'chai';
import sinon from 'sinon';

import AccountWriter from '../../../src/apps/backend/modules/account/internal/account-writer';
import AccountRepository from '../../../src/apps/backend/modules/account/internal/store/account-repository';
import { AccountWithUserNameExistsError } from '../../../src/apps/backend/modules/account/types';
import { app } from '../helpers/helper.spec';

describe('API /api/accounts', () => {
  let sinonSandbox: sinon.SinonSandbox;

  beforeEach(async () => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  describe('POST', () => {
    it('POST /account should create a new account', async () => {
      const params = { username: faker.internet.userName(), password: 'password' };
      const res = await chai
        .request(app)
        .post('/api/accounts')
        .set('content-type', 'application/json')
        .send(params);

      expect(res.body.username).to.eq(params.username);
      await AccountRepository.accountDB.deleteOne({ username: params.username });
    });

    it('POST /account should throw if account with username already exists', async () => {
      const params = { username: faker.internet.userName(), password: 'password' };
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
});
