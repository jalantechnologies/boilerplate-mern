/* eslint-disable @typescript-eslint/no-unsafe-call */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import sinon from 'sinon';
import AccesstokenServiceManager from '../../../src/modules/access-token/access-token-manager';
import AccountWriter from '../../../src/modules/account/internal/account-writer';
import AccountRepository from '../../../src/modules/account/internal/store/account-repository';
import ConfigService from '../../../src/modules/config/config-service';

chai.use(chaiHttp);

let sinonSandbox: sinon.SinonSandbox;
let app: any;

describe('POST /access-tokens', () => {
  before(async () => {
    const accessTokenRESTApiServer =
      await AccesstokenServiceManager.createRestAPIServer();
    await AccountRepository.createDBConnection();
    app = express();
    app.use('/', accessTokenRESTApiServer);
  });

  beforeEach(async () => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('should return access token for given username password', async () => {
    sinonSandbox.stub(ConfigService, 'getStringValue').returns('1h');

    const params = { username: 'username', password: 'password' };
    await AccountWriter.createAccount(params);

    const res = await chai
      .request(app)
      .post('/access-tokens')
      .set('content-type', 'application/json')
      .send(params);

    expect(res.body.token).to.be.a('string');
    await AccountRepository.accountDB.deleteOne({ username: params.username });
  });
});
