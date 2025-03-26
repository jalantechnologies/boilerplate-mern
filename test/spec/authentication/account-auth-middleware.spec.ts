import faker from '@faker-js/faker';
import { Account } from 'backend/modules/account';
import {
  AccessToken,
  AccessTokenExpiredError,
  AuthenticationService,
  AuthorizationHeaderNotFound,
  InvalidAuthorizationHeader,
  UnAuthorizedAccessError,
  accessAuthMiddleware,
} from 'backend/modules/authentication';
import ConfigService from 'backend/modules/config/config-service';
import { assert } from 'chai';
import { Request, Response } from 'express';
import sinon from 'sinon';

import { createAccount } from '../../helpers/account';

describe('accessAuthMiddleware', () => {
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
    accessAuthMiddleware(
      {
        params: {
          accountId: account.id,
        },
        headers: {
          authorization: `Bearer ${accessToken.token}`,
        },
      } as unknown as Request,
      {} as unknown as Response,
      controller
    );

    sinon.assert.calledOnce(controller);
    assert.isTrue(controller.calledOnce);
  });

  it('should throw error if provided accountId different', () => {
    assert.throws(
      () =>
        accessAuthMiddleware(
          {
            params: {
              accountId: faker.database.mongodbObjectId(),
            },
            headers: {
              authorization: `Bearer ${accessToken.token}`,
            },
          } as unknown as Request,
          {} as unknown as Response,
          controller
        ),
      new UnAuthorizedAccessError().message
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

    const expiredToken =
      await AuthenticationService.createAccessTokenByUsernameAndPassword(
        password,
        account.username
      );

    assert.throws(
      () =>
        accessAuthMiddleware(
          {
            params: {
              accountId: account.id,
            },
            headers: {
              authorization: `Bearer ${expiredToken.token}`,
            },
          } as unknown as Request,
          {} as unknown as Response,
          controller
        ),
      new AccessTokenExpiredError().message
    );

    sinon.assert.notCalled(controller);
  });

  it('should throw error if no auth token was provided', () => {
    const accountId = 'testAccountId';

    assert.throws(
      () =>
        accessAuthMiddleware(
          {
            params: { accountId },
            headers: {},
          } as unknown as Request,
          {} as unknown as Response,
          controller
        ),
      new AuthorizationHeaderNotFound().message
    );

    sinon.assert.notCalled(controller);
  });

  it('should throw error if provided auth header is invalid', () => {
    const accountId = 'testAccountId';

    assert.throws(
      () =>
        accessAuthMiddleware(
          {
            params: { accountId },
            headers: {
              authorization: 'invalidAuthHeader',
            },
          } as unknown as Request,
          {} as unknown as Response,
          controller
        ),
      new InvalidAuthorizationHeader().message
    );

    sinon.assert.notCalled(controller);
  });
});
