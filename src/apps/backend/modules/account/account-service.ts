import { EmailService } from '../communication';
import { SendEmailParams } from '../communication/types';
import { ConfigService } from '../config';

import AccountReader from './internal/account-reader';
import AccountUtil from './internal/account-util';
import AccountWriter from './internal/account-writer';
import {
  Account,
  AccountNotFoundError,
  AccountSearchParams,
  CreateAccountParams,
  GetAccountParams,
  CreatePasswordResetTokenParams,
  PasswordResetToken,
  PasswordResetTokenEmailNotEnabledForTheEnvironmentError,
} from './types';

export default class AccountService {
  public static async createAccount(
    params: CreateAccountParams,
  ): Promise<Account> {
    return AccountWriter.createAccount(params);
  }

  public static async getAccountByUsernamePassword(
    params: AccountSearchParams,
  ): Promise<Account> {
    return AccountReader.getAccountByUsernamePassword(params);
  }

  public static async getAccountById(
    params: GetAccountParams,
  ): Promise<Account> {
    return AccountReader.getAccountById(params.accountId);
  }

  public static async createPasswordResetToken(
    params: CreatePasswordResetTokenParams,
  ): Promise<PasswordResetToken> {
    let account: Account;

    try {
      account = await AccountReader.getAccountByUsername(params.username);
    } catch (e) {
      if (e instanceof AccountNotFoundError) {
        throw new AccountNotFoundError(params.username);
      }
      throw e;
    }
    const passwordResetToken = AccountUtil.generatePasswordResetToken();

    const passwordResetTokenDbData = await AccountWriter.createPasswordResetToken(
      account.id,
      passwordResetToken,
    );

    await this.sendPasswordResetEmail(
      account.id,
      account.firstName,
      account.username,
      passwordResetToken,
    );
    return passwordResetTokenDbData;
  }

  private static sendPasswordResetEmail(
    accountId: string,
    name: string,
    username: string,
    passwordResetToken: string,
  ): Promise<void> {
    const passwordResetTokenEmailEnabled = JSON.parse(ConfigService.getValue<string>(
      'account.passwordResetTokenEmailEnabled',
    )) as boolean;

    if (!passwordResetTokenEmailEnabled) {
      throw new PasswordResetTokenEmailNotEnabledForTheEnvironmentError();
    }

    const webAppHost = ConfigService.getValue<string>('webAppHost');
    const defaultEmail = ConfigService.getValue<string>('mailer.defaultEmail');
    const defaultEmailName = ConfigService.getValue<string>(
      'mailer.defaultEmailName',
    );
    const forgetPasswordMailTemplate = ConfigService.getValue<string>(
      'mailer.forgetPasswordMailTemplate',
    );

    const templateData = {
      name,
      passwordResetLink: `${webAppHost}/accounts/${accountId}/password_reset?token=${encodeURIComponent(
        passwordResetToken,
      )}`,
      username,
    };
    const passwordResetEmailParams: SendEmailParams = {
      recipient: {
        email: username,
      },
      sender: {
        email: defaultEmail,
        name: defaultEmailName,
      },
      templateData,
      templateId: forgetPasswordMailTemplate,
    };

    return EmailService.sendEmail(passwordResetEmailParams);
  }
}
