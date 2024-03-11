import { PasswordResetToken, PasswordResetTokenNotFoundError } from '../types';

import PasswordResetTokenUtil from './password-reset-token-util';
import PasswordResetTokenRepository from './store/password-reset-token-repository';

export default class PasswordResetTokenReader {
  public static async getPasswordResetTokenByAccountId(
    accountId: string,
  ): Promise<PasswordResetToken> {
    const tokenDB = await PasswordResetTokenRepository.findOne({
      account: accountId,
    }).sort({ createdAt: -1 }); // to get the latest token

    if (!tokenDB) {
      throw new PasswordResetTokenNotFoundError(accountId);
    }

    return PasswordResetTokenUtil.convertPasswordResetTokenDBToPasswordResetToken(tokenDB);
  }
}
