import { assert } from 'chai';
import sinon from 'sinon';

import {
  AccessToken,
  AccessTokenExpiredError,
  AccessTokenService,
  AuthorizationHeaderNotFound,
  InvalidAuthorizationHeader,
  UnAuthorizedAccessError,
} from '../../../src/apps/backend/modules/access-token';
import AccountAuthMiddleware from '../../../src/apps/backend/modules/access-token/rest-api/account-auth-middleware';
import {
  Account,
} from '../../../src/apps/backend/modules/account';
import ConfigService from '../../../src/apps/backend/modules/config/config-service';
import { ObjectIdUtils } from '../../../src/apps/backend/modules/database';
import { createAccount } from '../../helpers/account';

describe('AccountAuthMiddleware', () => {
  describe('ensureAccess', () => {
    let account: Account;
    let password: string;
    let accessToken: AccessToken;
    let controller: sinon.SinonSpy;

    beforeEach(async () => {
      password = '12345678';

      ({ account, accessToken } = await createAccount({
        accountParams: {
          password,
        },
      }));

      controller = sinon.fake();
    });

    it('should invoke provided controller if valid token was provided', () => {
      AccountAuthMiddleware.ensureAccess({
        params: {
          accountId: account.id,
        },
        headers: {
          authorization:
            `Bearer ${accessToken.token}`,
        },
      }, undefined, controller);

      sinon.assert.calledOnce(controller);
    });

    it('should throw error if provided accountId different', () => {
      assert.throws(
        () => AccountAuthMiddleware.ensureAccess({
          params: {
            accountId: ObjectIdUtils.createNew(),
          },
          headers: {
            authorization:
              `Bearer ${accessToken.token}`,
          },
        }, undefined, controller),
        new UnAuthorizedAccessError().message,
      );

      sinon.assert.notCalled(controller);
    });

    it('should throw error if provided token is expired', async () => {
      sinon
        .stub(ConfigService, 'getValue')
        .withArgs('accounts.tokenKey')
        .returns('random-key')
        .withArgs('accounts.tokenExpiry')
        .returns('-1h');

      const expiredToken = await AccessTokenService.createAccessToken({
        username: account.username,
        password,
      });

      assert.throws(
        () => AccountAuthMiddleware.ensureAccess({
          params: {
            accountId: account.id,
          },
          headers: {
            authorization: `Bearer ${expiredToken.token}`,
          },
        }, undefined, controller),
        new AccessTokenExpiredError().message,
      );

      sinon.assert.notCalled(controller);
    });

    it('should throw error if no auth token was provided', () => {
      const accountId = 'testAccountId';

      assert.throws(
        () => AccountAuthMiddleware.ensureAccess({
          params: { accountId },
          headers: {},
        }, undefined, controller),
        new AuthorizationHeaderNotFound().message,
      );

      sinon.assert.notCalled(controller);
    });

    it('should throw error if provided auth header is invalid', () => {
      const accountId = 'testAccountId';

      assert.throws(
        () => AccountAuthMiddleware.ensureAccess({
          params: { accountId },
          headers: {
            authorization: 'invalidAuthHeader',
          },
        }, undefined, controller),
        new InvalidAuthorizationHeader().message,
      );

      sinon.assert.notCalled(controller);
    });
  });
});
