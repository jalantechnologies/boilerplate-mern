import jsonwebtoken from 'jsonwebtoken';

import AccountService from '../../account/account-service';
import ConfigService from '../../config/config-service';
import { AccessToken, CreateAccessTokenParams } from '../types';

export default class AccessTokenWriter {
  public static async createAccessToken(
    params: CreateAccessTokenParams,
  ): Promise<AccessToken> {
    const accountSearchParams = {
      username: params.username,
      password: params.password,
    };
    const account = await AccountService.getAccountByUsernamePassword(
      accountSearchParams,
    );
    const jwtSigningKey = ConfigService.getStringValue('jwt.token');
    const jwtToken = jsonwebtoken.sign(
      { accountId: account.id },
      jwtSigningKey,
      {
        expiresIn: ConfigService.getStringValue('jwt.expiresIn'),
      },
    );
    const accessToken = new AccessToken();
    accessToken.accountId = account.id;
    accessToken.token = jwtToken;

    const vetifiedToken: jsonwebtoken.JwtPayload = jsonwebtoken.verify(
      jwtToken,
      jwtSigningKey,
    ) as jsonwebtoken.JwtPayload;

    accessToken.expiresAt = new Date(vetifiedToken.exp * 1000);

    return accessToken;
  }
}
