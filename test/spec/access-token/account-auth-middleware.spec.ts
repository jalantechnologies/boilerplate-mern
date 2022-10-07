import { assert } from 'chai';
import sinon from 'sinon';

import AccountAuthMiddleware from '../../../src/apps/backend/modules/access-token/rest-api/account-auth-middleware';
import {
  AccessTokenExpiredError,
  AuthorizationHeaderNotFound,
  InvalidAuthorizationHeader,
  UnAuthorizedAccessError,
} from '../../../src/apps/backend/modules/access-token/types';
import ConfigService from '../../../src/apps/backend/modules/config/config-service';

describe('AccountAuthMiddleware', () => {
  let sinonSandbox: sinon.SinonSandbox;

  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('should throw if accountId is not valid', async () => {
    sinonSandbox.stub(ConfigService, 'getStringValue').returns('token');
    const req = {
      params: { accountId: 'invalidAccountId' },
      headers: {
        authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiJ0ZXN0QWNjb3VudElkIiwiaWF0IjoxNjQ0NDE3NTcyLCJleHAiOjE2NzU5NzUxNzJ9.a96PwaQQAZHdPKFNhChyAkMnkGWr2Gt5jvWbFIIzNh0',
      },
    } as any;

    assert.throws(
      () => AccountAuthMiddleware.ensureAccess(req, undefined, undefined),
      new UnAuthorizedAccessError().message,
    );
  });

  it('should throw if token is expired', async () => {
    const accountId = 'testAccountId';
    const expiredToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOiJ0ZXN0QWNjb3VudElkIiwiaWF0IjoxNjQ0NDE5NTk1LCJleHAiOjE2NDQ0MTk2NTV9.YusiAFHAzg1zLNqowOUFGtnc5OobohTJll01aOMFxLc';

    sinonSandbox.stub(ConfigService, 'getStringValue').returns('token');
    const req = {
      params: { accountId },
      headers: {
        authorization: `Bearer ${expiredToken}`,
      },
    } as any;

    assert.throws(
      () => AccountAuthMiddleware.ensureAccess(req, undefined, undefined),
      new AccessTokenExpiredError().message,
    );
  });

  it('should throw if no auth token found', async () => {
    const accountId = 'testAccountId';

    sinonSandbox.stub(ConfigService, 'getStringValue').returns('token');
    const req = {
      params: { accountId },
      headers: {},
    } as any;

    assert.throws(
      () => AccountAuthMiddleware.ensureAccess(req, undefined, undefined),
      new AuthorizationHeaderNotFound().message,
    );
  });

  it('should throw if no auth header is invalid', async () => {
    const accountId = 'testAccountId';

    sinonSandbox.stub(ConfigService, 'getStringValue').returns('token');
    const req = {
      params: { accountId },
      headers: {
        authorization: 'invalidAuthHeader',
      },
    } as any;

    assert.throws(
      () => AccountAuthMiddleware.ensureAccess(req, undefined, undefined),
      new InvalidAuthorizationHeader().message,
    );
  });
});
