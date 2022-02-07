import {
  NextFunction, Request, Response,
} from 'express';

export default class AccountAuthMiddleware {
  public static ensureAccess(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    // TODO: Implement this
    // This will be a public method used by other services to ensure that the
    // request has access to the said resource. It should decode the JWT token
    // from the request and ensure the accountId associated with the token matches
    // with the accountId in the request. If they don't, then it should pass
    // UnAuthorizedAccessError in the next function
  }
}
