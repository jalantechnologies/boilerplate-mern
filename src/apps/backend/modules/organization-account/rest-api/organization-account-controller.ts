import {
  NextFunction, Request, Response,
} from 'express';

export default class OrganizationAccountController {
  public static createOrganizationAccount(
    _req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    try {
      res.status(201).send({});
    } catch (e) {
      next(e);
    }
  }
}
