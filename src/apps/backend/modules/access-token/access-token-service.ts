import jsonwebtoken from 'jsonwebtoken';

import AccountService from '../account/account-service';
import { Account, PhoneNumber } from '../account/types';
import { ConfigService } from '../config';
import { OtpIncorrectError, OtpService, OtpStatus } from '../otp';

import {
  AccessToken,
  AccessTokenExpiredError,
  AccessTokenInvalidError,
  AccessTokenPayload,
  VerifyAccessTokenParams,
} from './types';

export default class AccessTokenService {
  public static async createAccessTokenByUsernameAndPassword(
    password: string,
    username: string,
  ): Promise<AccessToken> {
    const account = await AccountService.getAccountByUsernameAndPassword(password, username);

    return AccessTokenService.generateAccessToken(account);
  }

  public static async createAccessTokenByPhoneNumber(
    otpCode: string,
    phoneNumber: PhoneNumber,
  ): Promise<AccessToken> {
    const account = await AccountService.getAccountByPhoneNumber(phoneNumber);

    const otp = await OtpService.verifyOTP(
      otpCode,
      phoneNumber,
    );

    if (otp.status !== OtpStatus.SUCCESS) {
      throw new OtpIncorrectError();
    }

    return AccessTokenService.generateAccessToken(account);
  }

  public static verifyAccessToken(
    params: VerifyAccessTokenParams,
  ): AccessTokenPayload {
    const { token } = params;
    let verifiedToken: jsonwebtoken.JwtPayload;

    try {
      const jwtSigningKey = ConfigService.getValue<string>('accounts.tokenKey');

      verifiedToken = jsonwebtoken.verify(
        token,
        jwtSigningKey,
        { ignoreExpiration: true },
      ) as jsonwebtoken.JwtPayload;
    } catch (e) {
      throw new AccessTokenInvalidError();
    }

    if (!verifiedToken.exp || verifiedToken.exp * 1000 < Date.now()) {
      throw new AccessTokenExpiredError();
    }

    return {
      accountId: verifiedToken.accountId as string,
    };
  }

  private static generateAccessToken(
    account: Account,
  ): AccessToken {
    const jwtSigningKey = ConfigService.getValue<string>('accounts.tokenKey');
    const jwtExpiry = ConfigService.getValue<string>('accounts.tokenExpiry');

    const jwtToken = jsonwebtoken.sign(
      { accountId: account.id },
      jwtSigningKey,
      { expiresIn: jwtExpiry },
    );

    const accessToken = new AccessToken();
    accessToken.accountId = account.id;
    accessToken.token = jwtToken;

    const jwtTokenDecoded = jsonwebtoken.decode(jwtToken) as jsonwebtoken.JwtPayload;

    if (!jwtTokenDecoded.exp) {
      throw new AccessTokenInvalidError();
    }

    accessToken.expiresAt = new Date(jwtTokenDecoded.exp * 1000);

    return accessToken;
  }
}
