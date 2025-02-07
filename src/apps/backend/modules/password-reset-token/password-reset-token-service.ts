import { AccountPasswordResetCommon } from '../../common';
import { EmailService } from '../communication';
import { SendEmailParams } from '../communication/types';
import { ConfigService } from '../config';


import PasswordResetTokenReader from './internal/password-reset-token-reader';
import PasswordResetTokenUtil from './internal/password-reset-token-util';
import PasswordResetTokenWriter from './internal/password-reset-token-writer';
import { PasswordResetAccountBadRequestError ,
  CreatePasswordResetTokenParams,
  PasswordResetToken,
  PasswordResetTokenEmailNotEnabledForTheEnvironmentError,
} from "./types";

export default class PasswordResetTokenService {
  public static async createPasswordResetToken(
    params: CreatePasswordResetTokenParams,
  ): Promise<PasswordResetToken> {
    const account = await AccountPasswordResetCommon.getAccountByUsername(
      params.username,
    );

    const token = PasswordResetTokenUtil.generatePasswordResetToken();

    const passwordResetToken =
      await PasswordResetTokenWriter.createPasswordResetToken(
        account.id,
        token,
      );

    await this.sendPasswordResetEmail(
      account.id,
      account.firstName,
      account.username,
      token,
    );

    return passwordResetToken;
  }

  public static async getPasswordResetTokenByAccountId(
    accountId: string,
  ): Promise<PasswordResetToken> {
    return PasswordResetTokenReader.getPasswordResetTokenByAccountId(accountId);
  }

  public static async setPasswordResetTokenAsUsedById(
    passwordResetTokenId: string,
  ): Promise<PasswordResetToken> {
    return PasswordResetTokenWriter.setPasswordResetTokenAsUsed(
      passwordResetTokenId,
    );
  }

  public static async verifyPasswordResetToken(
    accountId: string,
    token: string,
  ): Promise<PasswordResetToken> {
    const passwordResetToken =
      await PasswordResetTokenService.getPasswordResetTokenByAccountId(
        accountId,
      );

    if (passwordResetToken.isExpired) {
      throw new PasswordResetAccountBadRequestError(
        `Password reset link is expired for accountId ${accountId}. Please retry with new link`,
      );
    }

    if (passwordResetToken.isUsed) {
      throw new PasswordResetAccountBadRequestError(
        `Password reset is already used for accountId ${accountId}. Please retry with new link`,
      );
    }

    const isTokenValid = await PasswordResetTokenUtil.comparePasswordResetToken(
      token,
      passwordResetToken.token,
    );
    if (!isTokenValid) {
      throw new PasswordResetAccountBadRequestError(
        `Password reset link is invalid for accountId ${accountId}. Please retry with new link.`,
      );
    }

    return passwordResetToken;
  }

  private static async sendPasswordResetEmail(
    accountId: string,
    firstName: string,
    username: string,
    passwordResetToken: string,
  ): Promise<void> {
    const passwordResetEmailEnabled = ConfigService.getValue<boolean>(
      'accounts.passwordResetEmailEnabled',
    );

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
}
