import jsonwebtoken from 'jsonwebtoken';
import ConfigService from '../../config/config-service';
import { AccessToken, CreateAccessTokenParams } from '../types';

export default class AccessTokenWriter {
  public static createAccessToken(
    params: CreateAccessTokenParams,
  ): AccessToken {
    const jwtSigningKey = ConfigService.getStringValue('jwt.token');
    const jwtToken = jsonwebtoken.sign(
      { accountId: params.accountId },
      jwtSigningKey,
      {
        expiresIn: ConfigService.getStringValue('jwt.expiresIn'),
      },
    );
    const accessToken = new AccessToken();
    accessToken.accountId = params.accountId;
    accessToken.token = jwtToken;

    const vetifiedToken: jsonwebtoken.JwtPayload = jsonwebtoken.verify(
      jwtToken,
      jwtSigningKey,
    ) as jsonwebtoken.JwtPayload;

    accessToken.expiresAt = new Date(vetifiedToken.exp * 1000);

    return accessToken;
  }
}
