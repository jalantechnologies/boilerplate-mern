import { applicationController, Request, Response } from '../../application';
import AccessTokenService from '../access-token-service';
import {
  AccessToken,
  CreateAccessTokenParams,
  EmailBasedAuthAccessTokenRequestParams,
  OTPBasedAuthAccessTokenRequestParams,
} from '../types';
import { PhoneNumber } from '../../account';

import { serializeAccessTokenAsJSON } from './access-token-serializer';

export class AccessTokenController {
  createAccessToken = applicationController(async (
    req: Request<CreateAccessTokenParams>,
    res: Response,
  ) => {
    let accessToken: AccessToken;
    const { username, password } = req.body as EmailBasedAuthAccessTokenRequestParams;
    const { phoneNumber, otpCode } = req.body as OTPBasedAuthAccessTokenRequestParams;

    if (username && password) {
      accessToken = await AccessTokenService.createAccessTokenByUsernameAndPassword(
        password,
        username,
      );
    } else if (phoneNumber && otpCode) {
      accessToken = await AccessTokenService.createAccessTokenByPhoneNumber(
        otpCode,
        new PhoneNumber(phoneNumber.countryCode, phoneNumber.phoneNumber),
      );
    }

    const accessTokenJSON = serializeAccessTokenAsJSON(accessToken);

    res.send(accessTokenJSON);
  });
}
