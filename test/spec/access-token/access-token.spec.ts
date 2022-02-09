/* eslint-disable @typescript-eslint/no-unsafe-call */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import express from 'express';
import sinon from 'sinon';
import bodyParser from 'body-parser';
import AccesstokenServiceManager from '../../../src/modules/access-token/access-token-manager';
import ConfigService from '../../../src/modules/config/config-service';

chai.use(chaiHttp);

let sinonSandbox: sinon.SinonSandbox;

let accessTokenRESTApiServer: any;
let app: any;

describe('POST /access-tokens', () => {
  before(async () => {
    accessTokenRESTApiServer =
      await AccesstokenServiceManager.createRestAPIServer();
    app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/', accessTokenRESTApiServer);
  });

  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('should return access token for given account id', async () => {
    sinonSandbox.stub(ConfigService, 'getStringValue').returns('test-secret');
    const accountId = 'testAccountId';
    const res = await chai
      .request(app)
      .post('/access-tokens')
      .set('content-type', 'application/json')
      .send({ accountId });

    console.log(res.status);

    expect(res.body.accountId).to.eq(accountId);
    expect(res.body.token).to.be.a('string');
  });
});
