import jsonwebtoken from 'jsonwebtoken';

import AccountService from '../account/account-service';
import { ConfigService } from '../config';

import {
  AccessToken,
  AccessTokenExpiredError,
  AccessTokenInvalidError,
  AccessTokenPayload,
  CreateAccessTokenParams,
  VerifyAccessTokenParams,
} from './types';
import { Account } from '../account';

export default class AccessTokenService {
  public static async generateAccessToken(
    account: Account,
  ): Promise<AccessToken> {
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
    accessToken.expiresAt = new Date(jwtTokenDecoded.exp * 1000);

    return accessToken;
  }

  public static async createAccessTokenWithUsernameAndPassword(
    params: CreateAccessTokenParams,
  ): Promise<AccessToken> {
    const account = await AccountService.getAccountByUsernamePassword({
      password: params.password,
      username: params.username,
    });

    return AccessTokenService.generateAccessToken(account);
  }

  public static async createAccessTokenWithContactNumber(
    params: CreateAccessTokenParams,
  ): Promise<AccessToken> {
    const account = await AccountService.getAccountByContactNumber({
      contactNumber: params.contactNumber,
    });

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

    if (verifiedToken.exp * 1000 < Date.now()) {
      throw new AccessTokenExpiredError();
    }

    return {
      accountId: verifiedToken.accountId as string,
    };
  }
}
