import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import AccountService from '../account-service';
import {
  Account,
  CreateAccountParams,
  CreateAccountParamsByPhoneNumber,
  CreateAccountParamsByUsernameAndPassword,
  GetAccountParams,
  PhoneNumber,
} from '../types';

import { serializeAccountAsJSON } from './account-serializer';

export class AccountController {
  createAccount = applicationController(
    async (req: Request<CreateAccountParams>, res: Response) => {
      let account: Account;
      const {
        firstName,
        lastName,
        password,
        username,
      } = req.body as CreateAccountParamsByUsernameAndPassword;
      const {
        phoneNumber,
      } = req.body as CreateAccountParamsByPhoneNumber;

      if (username && password) {
        account = await AccountService.createAccountByUsernameAndPassword(
          firstName,
          lastName,
          password,
          username,
        );
      } else if (phoneNumber) {
        account = await AccountService.createAccountByPhoneNumber(
          new PhoneNumber(phoneNumber.countryCode, phoneNumber.phoneNumber),
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
