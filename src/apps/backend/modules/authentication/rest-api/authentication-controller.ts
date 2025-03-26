import { PhoneNumber } from 'backend/modules/account';
import {
  applicationController,
  Request,
  Response,
  HttpStatusCodes,
} from 'backend/modules/application';
import {
  AccessToken,
  AuthenticationService,
  CreateAccessTokenParams,
  EmailBasedAuthAccessTokenRequestParams,
  OTPBasedAuthAccessTokenRequestParams,
  CreatePasswordResetTokenParams,
} from 'backend/modules/authentication';
import {
  serializeAccessTokenAsJSON,
  serializePasswordResetTokenAsJSON,
} from 'backend/modules/authentication/rest-api/authentication-serializer';

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

      const accessTokenJSON = serializeAccessTokenAsJSON(accessToken!);

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
