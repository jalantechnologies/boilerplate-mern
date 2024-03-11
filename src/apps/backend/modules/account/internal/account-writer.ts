import { PasswordResetTokenService } from '../../password-reset-token';
import PasswordResetTokenUtil from '../../password-reset-token/internal/password-reset-token-util';
import {
  Account, AccountBadRequestError, CreateAccountParams,
} from '../types';

import AccountReader from './account-reader';
import AccountUtil from './account-util';
import AccountRepository from './store/account-repository';

export default class AccountWriter {
  public static async createAccount(
    params: CreateAccountParams,
  ): Promise<Account> {
    // check if account already exists
    // this will throw an error if it does
    await AccountReader.checkUsernameNotExists(params);

    const accHashedPwd = await AccountUtil.hashPassword(params.password);
    const accDb = await AccountRepository.create({
      firstName: params.firstName,
      lastName: params.lastName,
      username: params.username,
      hashedPassword: accHashedPwd,
      active: true,
    });

    return AccountUtil.convertAccountDBToAccount(accDb);
  }

  public static async resetPassword(
    accountId: string,
    newPassword: string,
    token: string,
  ): Promise<Account> {
    const passwordResetToken = await PasswordResetTokenService.getPasswordResetTokenByAccountId(accountId);

    if (passwordResetToken.isExpired) {
      throw new AccountBadRequestError(
        `Password reset link is expired for accountId ${accountId}. Please retry with new link`,
      );
    }

    if (passwordResetToken.isUsed) {
      throw new AccountBadRequestError(
        `Password reset is already used for accountId ${accountId}. Please retry with new link`,
      );
    }

    const isTokenValid = await PasswordResetTokenUtil.comparePasswordResetToken(
      token,
      passwordResetToken.token,
    );
    if (!isTokenValid) {
      throw new AccountBadRequestError(
        `Password reset link is invalid for accountId ${accountId}. Please retry with new link.`,
      );
    }

    const hashedPassword = await AccountUtil.hashPassword(newPassword);

    const dbAccount = await AccountRepository.findByIdAndUpdate(
      accountId,
      {
        hashedPassword,
      },
    );

    await PasswordResetTokenService.setPasswordResetTokenAsUsedById(
      passwordResetToken.id,
    );

    return AccountUtil.convertAccountDBToAccount(dbAccount);
  }
}
