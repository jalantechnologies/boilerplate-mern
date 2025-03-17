import { PhoneNumber } from '../../account/types';
import { applicationController, Request, Response } from '../../application';
import AuthenticationService from '../authentication-service';
import {
  AccessToken,
  CreateAccessTokenParams,
  EmailBasedAuthAccessTokenRequestParams,
  OTPBasedAuthAccessTokenRequestParams,
} from '../types';

import { serializeAccessTokenAsJSON } from './authentication-serializer';

export class AuthenticationController {
  createAccessToken = applicationController(
    async (req: Request<CreateAccessTokenParams>, res: Response) => {
      let accessToken: AccessToken;
      const { username, password } =
        req.body as EmailBasedAuthAccessTokenRequestParams;
      const { phoneNumber, otpCode } =
        req.body as OTPBasedAuthAccessTokenRequestParams;

      if (username && password) {
        accessToken =
          await AuthenticationService.createAccessTokenByUsernameAndPassword(
            password,
            username
          );
      } else if (phoneNumber && otpCode) {
        accessToken =
          await AuthenticationService.createAccessTokenByPhoneNumber(
            otpCode,
            new PhoneNumber(phoneNumber.countryCode, phoneNumber.phoneNumber)
          );
      }

      const accessTokenJSON = serializeAccessTokenAsJSON(accessToken);

      res.send(accessTokenJSON);
    }
  );
}
