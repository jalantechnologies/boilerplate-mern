import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import PasswordResetTokenService from '../password-reset-token-service';
import { CreatePasswordResetTokenParams } from "../types";

export class PasswordResetTokenController {
  createPasswordResetToken = applicationController(
    async (req: Request<CreatePasswordResetTokenParams>, res: Response) => {
      await PasswordResetTokenService.createPasswordResetToken({
        username: req.body.username,
      });

      res.status(HttpStatusCodes.CREATED).send();
    },
  );
}