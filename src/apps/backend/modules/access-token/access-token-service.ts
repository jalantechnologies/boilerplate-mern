import AccessTokenWriter from './internal/access-token-writer';
import { AccessToken, CreateAccessTokenParams } from './types';

export default class AccessTokenService {
  public static async createAccessToken(
    params: CreateAccessTokenParams,
  ): Promise<AccessToken> {
    return AccessTokenWriter.createAccessToken(params);
  }
}
