import { applicationController, Request, Response } from '../../application';
import AccessTokenService from '../access-token-service';
import { AccessToken, CreateAccessTokenParams } from '../types';

import { serializeAccessTokenAsJSON } from './access-token-serializer';

export class AccessTokenController {
  createAccessToken = applicationController(async (
    req: Request<CreateAccessTokenParams>,
    res: Response,
  ) => {
    let accessToken: AccessToken;

    if (req.body.username && req.body.password) {
      accessToken = await AccessTokenService.createAccessTokenByUsernameAndPassword(
        req.body.password,
        req.body.username,
      );
    } else if (req.body.phoneNumber && req.body.otpCode) {
      accessToken = await AccessTokenService.createAccessTokenByPhoneNumber(
        req.body.otpCode,
        req.body.phoneNumber,
      );
    }

    const accessTokenJSON = serializeAccessTokenAsJSON(accessToken);

    res.send(accessTokenJSON);
  });
}
