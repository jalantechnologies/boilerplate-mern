import jsonwebtoken from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import ConfigService from '../../config/config-service';
import { UnAuthorizedAccessError } from '../types';

export default class AccountAuthMiddleware {
  public static ensureAccess(
    req: Request,
    _res: Response,
    _next: NextFunction,
  ): void {
    // TODO: Implement this
    // This will be a public method used by other services to ensure that the
    // request has access to the said resource. It should decode the JWT token
    // from the request and ensure the accountId associated with the token matches
    // with the accountId in the request. If they don't, then it should pass
    // UnAuthorizedAccessError in the next function
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];
    const { accountId } = jsonwebtoken.verify(
      token,
      ConfigService.getStringValue('JWT_SECRET'),
    ) as { accountId: string };

    if (accountId !== req.params.accountId) {
      throw new UnAuthorizedAccessError();
    }
  }
}
