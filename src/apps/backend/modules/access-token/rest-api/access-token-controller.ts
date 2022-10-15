import { NextFunction, Request, Response } from 'express';

import AccessTokenService from '../access-token-service';
import { AccessToken, CreateAccessTokenParams } from '../types';

export default class AccessTokenController {
  public static async createAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const { username, password }: CreateAccessTokenParams = req.body as CreateAccessTokenParams;
      const params: CreateAccessTokenParams = { username, password };
      const accessToken = await AccessTokenService.createAccessToken(params);
      res.send(AccessTokenController.serializeAccessTokenAsJSON(accessToken));
    } catch (e) {
      next(e);
    }
  }

  private static serializeAccessTokenAsJSON(accessToken: AccessToken): unknown {
    return {
      accountId: accessToken.accountId,
      expiresAt: accessToken.expiresAt.toUTCString(),
      token: accessToken.token,
    };
  }
}
