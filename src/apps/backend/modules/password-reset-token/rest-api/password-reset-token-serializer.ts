import { serializeAccountAsJSON } from '../../account/rest-api/account-serializer';
import { PasswordResetToken } from '../types';

export const serializePasswordResetTokenAsJSON = (
  passwordResetToken: PasswordResetToken,
): unknown => ({
  id: passwordResetToken._id,
  account: serializeAccountAsJSON(passwordResetToken.account),
  expiresAt: passwordResetToken.expiresAt,
  token: passwordResetToken.token,
  isUsed: passwordResetToken.isUsed,
  isExpired: passwordResetToken.isExpired,
});
