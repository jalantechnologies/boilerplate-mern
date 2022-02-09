import jsonwebtoken from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import ConfigService from '../../config/config-service';
import { AccessTokenExpiredError, UnAuthorizedAccessError } from '../types';

export default class AccountAuthMiddleware {
  public static ensureAccess(
    req: Request,
    _res: Response,
    _next: NextFunction,
  ): void {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const verifiedToken = jsonwebtoken.verify(
      token,
      ConfigService.getStringValue('JWT_SECRET'),
      { ignoreExpiration: true },
    ) as jsonwebtoken.JwtPayload;

    if (verifiedToken.accountId !== req.params.accountId) {
      throw new UnAuthorizedAccessError();
    }

    if (verifiedToken.exp * 1000 < Date.now()) {
      throw new AccessTokenExpiredError();
    }
  }
}
