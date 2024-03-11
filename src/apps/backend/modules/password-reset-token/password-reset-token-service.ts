import { AccountService } from "../account";
import { EmailService } from "../communication";
import { SendEmailParams } from "../communication/types";
import { ConfigService } from "../config";
import PasswordResetTokenReader from "./internal/password-reset-token-reader";
import PasswordResetTokenUtil from "./internal/password-reset-token-util";
import PasswordResetTokenWriter from "./internal/password-reset-token-writer";
import { CreatePasswordResetTokenParams, PasswordResetToken, PasswordResetTokenEmailNotEnabledForTheEnvironmentError } from "./types";

export default class PasswordResetTokenService {
  public static async createPasswordResetToken(
    params: CreatePasswordResetTokenParams,
  ): Promise<PasswordResetToken> {
    const account = await AccountService.getAccountByUsername(params.username);

    const passwordResetToken = PasswordResetTokenUtil.generatePasswordResetToken();

    const passwordResetTokenDbData = await PasswordResetTokenWriter.createPasswordResetToken(
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

  public static async getPasswordResetTokenByAccountId(
    accountId: string,
  ): Promise<PasswordResetToken> {
    return PasswordResetTokenReader.getPasswordResetTokenByAccountId(accountId);
  }

  private static async sendPasswordResetEmail(
    accountId: string,
    firstName: string,
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
      firstName,
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

  public static async setPasswordResetTokenAsUsedById(
    passwordResetTokenId: string,
  ): Promise<PasswordResetToken> {
    return PasswordResetTokenWriter.setPasswordResetTokenAsUsed(
      passwordResetTokenId,
    )
  }
}
