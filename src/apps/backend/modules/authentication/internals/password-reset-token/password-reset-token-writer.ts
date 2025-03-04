import { PasswordResetToken } from 'backend/modules/authentication';
import PasswordResetTokenUtil from 'backend/modules/authentication/internals/password-reset-token/password-reset-token-util';
import PasswordResetTokenRepository from 'backend/modules/authentication/internals/password-reset-token/store/password-reset-token-repository';

export default class PasswordResetTokenWriter {
  public static async createPasswordResetToken(
    accountId: string,
    token: string
  ): Promise<PasswordResetToken> {
    const tokenHash =
      await PasswordResetTokenUtil.hashPasswordResetToken(token);
    const expiresAt = PasswordResetTokenUtil.getTokenExpiresAt();

    const passwordResetTokenDB = await PasswordResetTokenRepository.create({
      account: accountId,
      expiresAt,
      token: tokenHash,
    });

    return PasswordResetTokenUtil.convertPasswordResetTokenDBToPasswordResetToken(
      passwordResetTokenDB
    );
  }

  public static async setPasswordResetTokenAsUsed(
    passwordResetTokenId: string
  ): Promise<PasswordResetToken> {
    const updatedToken = await PasswordResetTokenRepository.findByIdAndUpdate(
      passwordResetTokenId,
      {
        isUsed: true,
      },
      { new: true }
    );

    if (!updatedToken) {
      throw new PasswordResetTokenNotFoundError(
        `Password reset token with id ${passwordResetTokenId} not found`
      );
    }

    return PasswordResetTokenUtil.convertPasswordResetTokenDBToPasswordResetToken(
      updatedToken
    );
  }
}
