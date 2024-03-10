import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import { Logger } from '../../logger';
import AccountService from '../account-service';
import { CreateAccountParams, GetAccountParams, CreatePasswordResetTokenParams } from '../types';

import { serializeAccountAsJSON } from './account-serializer';

export class AccountController {
  createAccount = applicationController(
    async (req: Request<CreateAccountParams>, res: Response) => {
      const account = await AccountService.createAccount({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
      });
      const accountJSON = serializeAccountAsJSON(account);

      res.status(HttpStatusCodes.CREATED).send(accountJSON);
    },
  );

  getAccountById = applicationController(
    async (req: Request<GetAccountParams>, res: Response) => {
      const account = await AccountService.getAccountById({
        accountId: req.params.accountId,
      });
      const accountJSON = serializeAccountAsJSON(account);

      res.status(HttpStatusCodes.OK).send(accountJSON);
    },
  );

  createPasswordResetToken = applicationController(
    async (req: Request<CreatePasswordResetTokenParams>, res: Response) => {
      await AccountService.createPasswordResetToken({
        username: req.body.username,
      });

      res.status(HttpStatusCodes.CREATED).send();
    },
  );

  resetPassword = applicationController(
    (req: Request<CreatePasswordResetTokenParams>, res: Response) => {
      // under development
      Logger.info('req body', req.body);
      res.status(HttpStatusCodes.OK).send();
    },
  );
}
