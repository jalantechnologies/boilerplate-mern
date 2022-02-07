import {
  NextFunction, Request, Response,
} from 'express';
import { Account } from '../types';

export default class AccountController {
  public static createAccount(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    // TODO: Implement this
    // After creating task using AccountService.createAccount, it should serialize
    // the account using serializeAccountAsJSON function in this controller
  }

  private static serializeAccountAsJSON(account: Account): unknown {
    return {
      id: account.id,
      username: account.username,
    };
  }
}
