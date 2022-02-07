import {
  NextFunction, Request, Response,
} from 'express';
import { AccessToken } from '../types';

export default class AccessTokenController {
  public static createAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    // TODO: Implement this
    // After creating task using AccessTokenService.createAccessToken, it should serialize
    // the access token using serializeAccessTokenAsJSON function in this controller
  }

  private static serializeAccessTokenAsJSON(accessToken: AccessToken): unknown {
    return {
      accountId: accessToken.accountId,
      expiresAt: accessToken.expiresAt.toUTCString(),
      token: accessToken.token,
    };
  }
}
