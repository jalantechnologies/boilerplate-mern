import faker from '@faker-js/faker';
import chai, { expect } from 'chai';

import AccountWriter from '../../../src/apps/backend/modules/account/internal/account-writer';
import { app } from '../../helpers/app';

describe('AccessToken API', () => {
  describe('POST /access-tokens', () => {
    it('should return access token for given username password', async () => {
      const params = {
        username: faker.internet.email(),
        password: 'password',
      };
      await AccountWriter.createAccount(params);

      const res = await chai
        .request(app)
        .post('/api/access-tokens')
        .set('content-type', 'application/json')
        .send(params);

      expect(res.body.token).to.be.a('string');
    });
  });
});
