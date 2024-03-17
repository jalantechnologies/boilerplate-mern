import faker from '@faker-js/faker';
import chai, { expect } from 'chai';

import { AccountWithUserNameExistsError } from '../../../src/apps/backend/modules/account';
import AccountWriter from '../../../src/apps/backend/modules/account/internal/account-writer';
import { app } from '../../helpers/app';

describe('Account API', () => {
  describe('POST /accounts', () => {
    it('should create a new account', async () => {
      const params = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        password: 'password',
      };
      const res = await chai
        .request(app)
        .post('/api/accounts')
        .set('content-type', 'application/json')
        .send(params);

      expect(res.status).to.be.eq(201);
      expect(res.body.username).to.eq(params.username);
    });

    it('should throw error if account with username already exists', async () => {
      const params = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        password: 'password',
      };
      await AccountWriter.createAccount(params);
      const res = await chai
        .request(app)
        .post('/api/accounts')
        .set('content-type', 'application/json')
        .send(params);

      expect(res.status).to.be.eq(409);
      expect(res.body.message).to.eq(
        new AccountWithUserNameExistsError(params.username).message,
      );
    });
  });
});
