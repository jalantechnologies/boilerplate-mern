import jsonwebtoken from 'jsonwebtoken';
import ConfigService from '../../config/config-service';
import { AccessToken } from '../types';

export default class AccessTokenWriter {
  public static createAccessToken(accountId: string): AccessToken {
    const jwtSigningKey = ConfigService.getStringValue('jwt.token');
    const jwtToken = jsonwebtoken.sign({ accountId }, jwtSigningKey, {
      expiresIn: ConfigService.getStringValue('jwt.expiresIn'),
    });
    const accessToken = new AccessToken();
    accessToken.accountId = accountId;
    accessToken.token = jwtToken;

    const vetifiedToken: jsonwebtoken.JwtPayload = jsonwebtoken.verify(
      jwtToken,
      jwtSigningKey,
    ) as jsonwebtoken.JwtPayload;

    accessToken.expiresAt = new Date(vetifiedToken.exp * 1000);

    return accessToken;
  }
}
