import _ from 'lodash';

import {
  applicationController,
  Request,
  Response,
  NextFunc,
} from '../../application';
import AccessTokenService from '../access-token-service';
import {
  AuthorizationHeaderNotFound,
  InvalidAuthorizationHeader,
  UnAuthorizedAccessError,
} from '../types';

export const accessAuthMiddleware = applicationController(
  (req: Request, _res: Response, next: NextFunc) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AuthorizationHeaderNotFound();
    }

    const [authScheme, authToken] = authHeader.split(' ');
    if (authScheme !== 'Bearer' || _.isEmpty(authToken)) {
      throw new InvalidAuthorizationHeader();
    }

    const authPayload = AccessTokenService.verifyAccessToken({
      token: authToken,
    });

    if (
      req.params.accountId &&
      authPayload.accountId !== req.params.accountId
    ) {
      throw new UnAuthorizedAccessError();
    }

    req.accountId = authPayload.accountId;
    next();
  }
);
