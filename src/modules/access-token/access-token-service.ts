import AccessTokenWriter from './internal/access-token-writer';
import { AccessToken, CreateAccessTokenParams } from './types';

export default class AccessTokenService {
  public static createAccessToken(
    params: CreateAccessTokenParams,
  ): AccessToken {
    return AccessTokenWriter.createAccessToken(params);
  }
}
