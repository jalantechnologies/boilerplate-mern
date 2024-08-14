import { Nullable } from '../../../types';
import { AccessToken } from '../types';

export const serializeAccessTokenAsJSON = (accessToken: Nullable<AccessToken>): unknown => ({
  accountId: accessToken?.accountId,
  expiresAt: accessToken?.expiresAt.toUTCString(),
  token: accessToken?.token,
});
