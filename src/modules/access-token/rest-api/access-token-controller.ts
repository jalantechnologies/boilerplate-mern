import { NextFunction, Request, Response } from 'express';
import AccessTokenService from '../access-token-service';
import { AccessToken, CreateAccessTokenParams } from '../types';

export default class AccessTokenController {
  public static createAccessToken(
    req: Request,
    res: Response,
    _next: NextFunction,
  ): void {
    const { accountId }: { accountId: string } = req.body as {
      accountId: string;
    };
    const params: CreateAccessTokenParams = { accountId };
    const accessToken = AccessTokenService.createAccessToken(params);
    res.send(AccessTokenController.serializeAccessTokenAsJSON(accessToken));
  }

  private static serializeAccessTokenAsJSON(accessToken: AccessToken): unknown {
    return {
      accountId: accessToken.accountId,
      expiresAt: accessToken.expiresAt.toUTCString(),
      token: accessToken.token,
    };
  }
}
