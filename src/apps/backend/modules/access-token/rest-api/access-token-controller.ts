import { applicationController, Request, Response } from '../../application';
import AccessTokenService from '../access-token-service';
import { CreateAccessTokenParams } from '../types';

import { serializeAccessTokenAsJSON } from './access-token-serializer';

export class AccessTokenController {
  createAccessToken = applicationController(async (
    req: Request<CreateAccessTokenParams>,
    res: Response,
  ) => {
    const accessToken = await AccessTokenService.createAccessToken({
      username: req.body.username,
      password: req.body.password,
    });
    const accessTokenJSON = serializeAccessTokenAsJSON(accessToken);

    res.send(accessTokenJSON);
  });
}
