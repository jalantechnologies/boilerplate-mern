import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import PasswordResetTokenService from '../password-reset-token-service';
import {
  CreatePasswordResetTokenParams,
  ValidatePasswordResetTokenAndResetPasswordParams,
} from '../types';

import { serializePasswordResetTokenAsJSON } from './password-reset-token-serializer';

export class PasswordResetTokenController {
  createPasswordResetToken = applicationController(
    async (req: Request<CreatePasswordResetTokenParams>, res: Response) => {
      const passwordResetToken =
        await PasswordResetTokenService.createPasswordResetToken({
          username: req.body.username,
        });

      const passwordResetTokenJSON =
        serializePasswordResetTokenAsJSON(passwordResetToken);

      res.status(HttpStatusCodes.CREATED).send(passwordResetTokenJSON);
    }
  );

  validateTokenAndResetPassword = applicationController(
    async (
      req: Request<ValidatePasswordResetTokenAndResetPasswordParams>,
      res: Response,
    ) => {
      const passwordResetToken =
        await PasswordResetTokenService.validateTokenAndResetPassword({
          newPassword: req.body.newPassword,
          accountId: req.body.accountId,
          token: req.body.token,
        });

      if (passwordResetToken) {
        const passwordResetTokenJSON =
          serializePasswordResetTokenAsJSON(passwordResetToken);
        res.status(HttpStatusCodes.CREATED).send(passwordResetTokenJSON);
      }
    },
  );
}
