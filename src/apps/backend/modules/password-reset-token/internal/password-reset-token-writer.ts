import { ConfigService } from '../../config';
import { PasswordResetToken } from '../types';

import PasswordResetTokenUtil from './password-reset-token-util';
import PasswordResetTokenRepository from './store/password-reset-token-repository';

export default class PasswordResetTokenWriter {
  public static async createPasswordResetToken(
    accountId: string,
    token: string,
  ): Promise<PasswordResetToken> {
    const defaultTokenExpireTimeInSeconds = ConfigService.getValue<string>(
      'passwordResetToken.expiresInSeconds',
    );

    const tokenHash = await PasswordResetTokenUtil.hashPasswordResetToken(token);
    const expiresAt = PasswordResetTokenUtil.getTokenExpiresAt(defaultTokenExpireTimeInSeconds);

    const passwordResetTokenDB = await PasswordResetTokenRepository.create({
      account: accountId,
      expiresAt,
      token: tokenHash,
    });

    return PasswordResetTokenUtil.convertPasswordResetTokenDBToPasswordResetToken(
      passwordResetTokenDB,
    );
  }

  public static async setPasswordResetTokenAsUsed(
    passwordResetTokenId: string,
  ): Promise<PasswordResetToken> {
    return PasswordResetTokenRepository.findByIdAndUpdate(
      passwordResetTokenId,
      {
        isUsed: true,
      },
      { new: true },
    );
  }
}
