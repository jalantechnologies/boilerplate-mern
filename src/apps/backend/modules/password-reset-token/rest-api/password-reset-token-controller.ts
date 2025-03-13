import { applicationController, HttpStatusCodes, Request, Response } from '../../application';
import PasswordResetTokenService from '../password-reset-token-service';
import { CreatePasswordResetTokenParams } from '../types';

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
}
