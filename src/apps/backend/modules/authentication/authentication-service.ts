import jsonwebtoken from 'jsonwebtoken';

import {
  AccountService,
  Account,
  PhoneNumber,
  AccountBadRequestError,
} from '../account';
import { SMSService, EmailService, SendEmailParams } from '../communication';
import { ConfigService } from '../config';

import OTPUtil from './internals/otp/otp-util';
import OTPWriter from './internals/otp/otp-writer';
import PasswordResetTokenReader from './internals/password-reset-token/password-reset-token-reader';
import PasswordResetTokenUtil from './internals/password-reset-token/password-reset-token-util';
import PasswordResetTokenWriter from './internals/password-reset-token/password-reset-token-writer';
import {
  AccessToken,
  AccessTokenExpiredError,
  AccessTokenInvalidError,
  AccessTokenPayload,
  VerifyAccessTokenParams,
  OTPIncorrectError,
  OTPStatus,
  OTP,
  CreatePasswordResetTokenParams,
  PasswordResetToken,
  PasswordResetTokenEmailNotEnabledForTheEnvironmentError,
} from './types';

export default class AuthenticationService {
  public static async createAccessTokenByUsernameAndPassword(
    password: string,
    username: string
  ): Promise<AccessToken> {
    const account = await AccountService.getAccountByUsernameAndPassword(
      password,
      username
    );

    return AuthenticationService.generateAccessToken(account);
  }

  public static async createAccessTokenByPhoneNumber(
    otpCode: string,
    phoneNumber: PhoneNumber
  ): Promise<AccessToken> {
    const account = await AccountService.getAccountByPhoneNumber(phoneNumber);

    const otp = await AuthenticationService.verifyOTP(otpCode, phoneNumber);

    if (otp.status !== OTPStatus.SUCCESS) {
      throw new OTPIncorrectError();
    }

    return AuthenticationService.generateAccessToken(account);
  }

  public static verifyAccessToken(
    params: VerifyAccessTokenParams
  ): AccessTokenPayload {
    const { token } = params;
    let verifiedToken: jsonwebtoken.JwtPayload;

    try {
      const jwtSigningKey = ConfigService.getValue<string>('accounts.tokenKey');

      const decodedToken = jsonwebtoken.verify(token, jwtSigningKey, {
        ignoreExpiration: true,
      });

      if (typeof decodedToken === 'string') {
        throw new AccessTokenInvalidError();
      }

      verifiedToken = decodedToken;
    } catch (e) {
      throw new AccessTokenInvalidError();
    }

    if (verifiedToken.exp * 1000 < Date.now()) {
      throw new AccessTokenExpiredError();
    }

    return {
      accountId: verifiedToken.accountId as string,
    };
  }

  public static async createOTP(phoneNumber: PhoneNumber): Promise<OTP> {
    const otp = await OTPWriter.expirePreviousOTPAndCreateNewOTP(phoneNumber);

    if (!OTPUtil.isDefaultPhoneNumber(phoneNumber.phoneNumber)) {
      await SMSService.sendSMS({
        messageBody: `${otp.otpCode} is your one time password to login.`,
        recipientPhone: phoneNumber,
      });
    }

    return otp;
  }

  public static async verifyOTP(
    otpCode: string,
    phoneNumber: PhoneNumber
  ): Promise<OTP> {
    return OTPWriter.verifyOTP(phoneNumber, otpCode);
  }

  public static async createPasswordResetToken(
    params: CreatePasswordResetTokenParams
  ): Promise<PasswordResetToken> {
    const account = await AccountService.getAccountByUsername(params.username);

    const token = PasswordResetTokenUtil.generatePasswordResetToken();

    const passwordResetToken =
      await PasswordResetTokenWriter.createPasswordResetToken(
        account.id,
        token
      );

    await this.sendPasswordResetEmail(
      account.id,
      account.firstName,
      account.username,
      token
    );

    return passwordResetToken;
  }

  public static async getPasswordResetTokenByAccountId(
    accountId: string
  ): Promise<PasswordResetToken> {
    return PasswordResetTokenReader.getPasswordResetTokenByAccountId(accountId);
  }

  public static async setPasswordResetTokenAsUsedById(
    passwordResetTokenId: string
  ): Promise<PasswordResetToken> {
    return PasswordResetTokenWriter.setPasswordResetTokenAsUsed(
      passwordResetTokenId
    );
  }

  public static async verifyPasswordResetToken(
    accountId: string,
    token: string
  ): Promise<PasswordResetToken> {
    const passwordResetToken =
      await AuthenticationService.getPasswordResetTokenByAccountId(accountId);

    if (passwordResetToken.isExpired) {
      throw new AccountBadRequestError(
        `Password reset link is expired for accountId ${accountId}. Please retry with new link`
      );
    }

    if (passwordResetToken.isUsed) {
      throw new AccountBadRequestError(
        `Password reset is already used for accountId ${accountId}. Please retry with new link`
      );
    }

    const isTokenValid = await PasswordResetTokenUtil.comparePasswordResetToken(
      token,
      passwordResetToken.token
    );
    if (!isTokenValid) {
      throw new AccountBadRequestError(
        `Password reset link is invalid for accountId ${accountId}. Please retry with new link.`
      );
    }

    return passwordResetToken;
  }

  private static generateAccessToken(account: Account): AccessToken {
    const jwtSigningKey = ConfigService.getValue<string>('accounts.tokenKey');
    const jwtExpiry = ConfigService.getValue<string>('accounts.tokenExpiry');

    const jwtToken = jsonwebtoken.sign(
      { accountId: account.id },
      jwtSigningKey,
      { expiresIn: jwtExpiry }
    );

    const accessToken = new AccessToken();
    accessToken.accountId = account.id;
    accessToken.token = jwtToken;

    const jwtTokenDecoded = jsonwebtoken.decode(jwtToken);

    if (typeof jwtTokenDecoded === 'string') {
      throw new AccessTokenInvalidError();
    }

    accessToken.expiresAt = new Date(jwtTokenDecoded.exp * 1000);

    return accessToken;
  }

  private static async sendPasswordResetEmail(
    accountId: string,
    firstName: string,
    username: string,
    passwordResetToken: string
  ): Promise<void> {
    const passwordResetEmailEnabled = ConfigService.getValue<boolean>(
      'accounts.passwordResetEmailEnabled'
    );

    if (!passwordResetEmailEnabled) {
      throw new PasswordResetTokenEmailNotEnabledForTheEnvironmentError();
    }

    const webAppHost = ConfigService.getValue<string>('webAppHost');
    const defaultEmail = ConfigService.getValue<string>('mailer.defaultEmail');
    const defaultEmailName = ConfigService.getValue<string>(
      'mailer.defaultEmailName'
    );
    const forgetPasswordMailTemplateId = ConfigService.getValue<string>(
      'mailer.forgetPasswordMailTemplateId'
    );

    const templateData = {
      firstName,
      passwordResetLink: `${webAppHost}/accounts/${accountId}/reset_password?token=${encodeURIComponent(
        passwordResetToken
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
