import { AccessToken, PasswordResetToken } from '../types';

export const serializeAccessTokenAsJSON = (
  accessToken: AccessToken
): unknown => ({
  accountId: accessToken.accountId,
  expiresAt: accessToken.expiresAt.toUTCString(),
  token: accessToken.token,
});

export const serializePasswordResetTokenAsJSON = (
  passwordResetToken: PasswordResetToken
): unknown => ({
  id: passwordResetToken.id,
  account: passwordResetToken.account,
  expiresAt: passwordResetToken.expiresAt,
  token: passwordResetToken.token,
  isUsed: passwordResetToken.isUsed,
  isExpired: passwordResetToken.isExpired,
});
