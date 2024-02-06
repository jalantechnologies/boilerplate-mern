import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import AccountService from '../account-service';
import { CreateAccountParams } from '../types';

import { serializeAccountAsJSON } from './account-serializer';

export class AccountController {
  createAccount = applicationController(async (
    req: Request<CreateAccountParams>,
    res: Response,
  ) => {
    const account = await AccountService.createAccount({
      username: req.body.username,
      password: req.body.password,
    });
    const accountJSON = serializeAccountAsJSON(account);

    res
      .status(HttpStatusCodes.CREATED)
      .send(accountJSON);
  });
}
