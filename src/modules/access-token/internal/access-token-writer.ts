import jsonwebtoken from 'jsonwebtoken';
import ConfigService from '../../config/config-service';
import { AccessToken, CreateAccessTokenParams } from '../types';

export default class AccessTokenWriter {
  public static async createAccessToken(
    params: CreateAccessTokenParams,
  ): Promise<AccessToken> {
    const jwtToken = jsonwebtoken.sign(
      params.accountId,
      ConfigService.getStringValue('jwt.token'),
    );
    const accessToken = new AccessToken();
    accessToken.accountId = params.accountId;
    accessToken.token = jwtToken;
    return accessToken;
  }
}
