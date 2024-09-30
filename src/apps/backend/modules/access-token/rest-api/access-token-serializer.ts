import { AccessToken } from '../types';

export const serializeAccessTokenAsJSON = (
  accessToken: AccessToken,
): unknown => ({
  accountId: accessToken.accountId,
  expiresAt: accessToken.expiresAt.toUTCString(),
  token: accessToken.token,
});
