import { PhoneNumber } from '../../account';
import { applicationController, Request, Response, HttpStatusCodes } from '../../application';
import AuthenticationService from '../authentication-service';
import {
  AccessToken,
  CreateAccessTokenParams,
  EmailBasedAuthAccessTokenRequestParams,
  OTPBasedAuthAccessTokenRequestParams,
  CreatePasswordResetTokenParams,
} from '../types';

import { serializeAccessTokenAsJSON, serializePasswordResetTokenAsJSON } from './authentication-serializer';

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

  createPasswordResetToken = applicationController(
    async (req: Request<CreatePasswordResetTokenParams>, res: Response) => {
      const passwordResetToken =
        await AuthenticationService.createPasswordResetToken({
          username: req.body.username,
        });

      const passwordResetTokenJSON =
        serializePasswordResetTokenAsJSON(passwordResetToken);

      res.status(HttpStatusCodes.CREATED).send(passwordResetTokenJSON);
    }
  );
}
