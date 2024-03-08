import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import AccountService from '../account-service';
import {
  Account,
  CreateAccountParams,
  GetAccountParams,
} from '../types';

import { serializeAccountAsJSON } from './account-serializer';

export class AccountController {
  createAccount = applicationController(
    async (req: Request<CreateAccountParams>, res: Response) => {
      let account: Account;

      if (req.body.username && req.body.password) {
        account = await AccountService.createAccountByUsernameAndPassword(
          req.body.firstName,
          req.body.lastName,
          req.body.password,
          req.body.username,
        );
      } else if (req.body.phoneNumber) {
        account = await AccountService.createAccountByPhoneNumber(
          req.body.phoneNumber,
        );
      }

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
}
