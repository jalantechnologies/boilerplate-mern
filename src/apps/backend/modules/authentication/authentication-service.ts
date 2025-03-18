import jsonwebtoken from 'jsonwebtoken';

import { AccountService, Account, PhoneNumber } from '../account';
import { SMSService } from '../communication';
import { ConfigService } from '../config';

import OTPUtil from './internals/otp/otp-util';
import OTPWriter from './internals/otp/otp-writer';
import {
  AccessToken,
  AccessTokenExpiredError,
  AccessTokenInvalidError,
  AccessTokenPayload,
  VerifyAccessTokenParams, OTPIncorrectError, OTPStatus, OTP
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
}
