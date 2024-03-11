import { EmailService } from '../communication';
import { SendEmailParams } from '../communication/types';
import { ConfigService } from '../config';

import AccountReader from './internal/account-reader';
import AccountUtil from './internal/account-util';
import AccountWriter from './internal/account-writer';
import {
  Account,
  AccountSearchParams,
  CreateAccountParams,
  GetAccountParams,
  CreatePasswordResetTokenParams,
  PasswordResetToken,
  PasswordResetTokenEmailNotEnabledForTheEnvironmentError,
  ResetPasswordParams,
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
    const account = await AccountReader.getAccountByUsername(params.username);

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

  public static async resetPassword(
    params: ResetPasswordParams,
  ): Promise<Account> {
    const { accountId, newPassword, token } = params;
    return AccountWriter.resetPassword(
      accountId,
      newPassword,
      token,
    );
  }

  private static async sendPasswordResetEmail(
    accountId: string,
    name: string,
    username: string,
    passwordResetToken: string,
  ): Promise<void> {
    const passwordResetEmailEnabled = JSON.parse(ConfigService.getValue<string>(
      'account.passwordResetEmailEnabled',
    )) as boolean;

    if (!passwordResetEmailEnabled) {
      throw new PasswordResetTokenEmailNotEnabledForTheEnvironmentError();
    }

    const webAppHost = ConfigService.getValue<string>('webAppHost');
    const defaultEmail = ConfigService.getValue<string>('mailer.defaultEmail');
    const defaultEmailName = ConfigService.getValue<string>(
      'mailer.defaultEmailName',
    );
    const forgetPasswordMailTemplateId = ConfigService.getValue<string>(
      'mailer.forgetPasswordMailTemplateId',
    );

    const templateData = {
      name,
      passwordResetLink: `${webAppHost}/accounts/${accountId}/reset_password?token=${encodeURIComponent(
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
      templateId: forgetPasswordMailTemplateId,
    };

    return EmailService.sendEmail(passwordResetEmailParams);
  }
}
