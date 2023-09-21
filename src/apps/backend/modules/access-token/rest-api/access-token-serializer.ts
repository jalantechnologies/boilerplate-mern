import { AccessToken } from '../types';

export const serializeAccessToken = (accessToken: AccessToken): unknown => ({
  accountId: accessToken.accountId,
  expiresAt: accessToken.expiresAt.toUTCString(),
  token: accessToken.token,
});
