import { applicationController, Request, Response } from '../../application';
import { OtpService, OtpStatus } from '../../otp';
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
    } else if (req.body.contactNumber && req.body.otpCode) {
      const otp = await OtpService.verifyOTP(
        req.body.contactNumber,
        req.body.otpCode,
      );

      if (otp.status === OtpStatus.SUCCESS) {
        accessToken = await AccessTokenService.createAccessTokenByContactNumber(
          req.body.contactNumber,
        );
      }
    }

    const accessTokenJSON = serializeAccessTokenAsJSON(accessToken);

    res.send(accessTokenJSON);
  });
}
