import { PasswordResetToken } from '../types';

export const serializePasswordResetTokenAsJSON = (
  passwordResetToken: PasswordResetToken,
): unknown => ({
  id: passwordResetToken.id,
  account: passwordResetToken.account,
  expiresAt: passwordResetToken.expiresAt,
  token: passwordResetToken.token,
  isUsed: passwordResetToken.isUsed,
  isExpired: passwordResetToken.isExpired,
});
