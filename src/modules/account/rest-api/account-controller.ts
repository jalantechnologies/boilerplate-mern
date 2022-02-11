import { Request, Response } from 'express';
import AccountService from '../account-service';
import { Account, CreateAccountParams } from '../types';

export default class AccountController {
  public static async createAccount(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { username, password }: CreateAccountParams = req.body as CreateAccountParams;
    const params: CreateAccountParams = { username, password };
    const account = await AccountService.createAccount(params);
    res.status(201).send(AccountController.serializeAccountAsJSON(account));
  }

  private static serializeAccountAsJSON(account: Account): unknown {
    return {
      id: account.id,
      username: account.username,
    };
  }
}
