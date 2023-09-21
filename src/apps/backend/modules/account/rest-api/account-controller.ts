import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import AccountService from '../account-service';
import { CreateAccountParams } from '../types';

import { serializeAccount } from './account-serializer';

export const createAccount = applicationController(async (
  req: Request<CreateAccountParams>,
  res: Response,
) => {
  const account = await AccountService.createAccount({
    username: req.body.username,
    password: req.body.password,
  });
  const accountJSON = serializeAccount(account);

  res
    .status(HttpStatusCodes.CREATED)
    .send(accountJSON);
});
