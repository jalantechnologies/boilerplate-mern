import AccessTokenWriter from './internal/access-token-writer';
import {
  AccessToken,
  AccessTokenPayload,
  CreateAccessTokenParams,
  VerifyAccessTokenParams,
} from './types';

export default class AccessTokenService {
  public static async createAccessToken(
    params: CreateAccessTokenParams,
  ): Promise<AccessToken> {
    return AccessTokenWriter.createAccessToken(params);
  }

  public static verifyAccessToken(
    params: VerifyAccessTokenParams,
  ): AccessTokenPayload {
    return AccessTokenWriter.verifyAccessToken(params);
  }
}
