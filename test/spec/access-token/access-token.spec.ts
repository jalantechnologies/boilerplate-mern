import faker from '@faker-js/faker';
import chai, { expect } from 'chai';
import sinon from 'sinon';

import AccountWriter from '../../../src/apps/backend/modules/account/internal/account-writer';
import AccountRepository from '../../../src/apps/backend/modules/account/internal/store/account-repository';
import ConfigService from '../../../src/apps/backend/modules/config/config-service';
import { app } from '../helpers/helper.spec';

describe('API /api/access-tokens', () => {
  let sinonSandbox: sinon.SinonSandbox;

  beforeEach(async () => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(async () => {
    sinonSandbox.restore();
  });

  describe('POST', () => {
    it('should return access token for given username password', async () => {
      sinonSandbox.stub(ConfigService, 'getStringValue').returns('1h');

      const params = { username: faker.internet.userName(), password: 'password' };
      await AccountWriter.createAccount(params);

      const res = await chai
        .request(app)
        .post('/api/access-tokens')
        .set('content-type', 'application/json')
        .send(params);

      expect(res.body.token).to.be.a('string');
      await AccountRepository.accountDB.deleteOne({ username: params.username });
    });
  });
});
