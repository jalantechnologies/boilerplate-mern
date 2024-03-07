import { AccessTokenService } from '../../access-token';
import { serializeAccessTokenAsJSON } from '../../access-token/rest-api/access-token-serializer';
import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import AccountService from '../account-service';
import {
  CreateAccountParams,
  GenerateOTPParams,
  GetAccountParams,
  VerifyOTPParams,
} from '../types';

import { serializeAccountAsJSON } from './account-serializer';

export class AccountController {
  createAccount = applicationController(
    async (req: Request<CreateAccountParams>, res: Response) => {
      const account = await AccountService.createAccount({
        contactNumber: req.body.contactNumber,
        username: req.body.username,
        password: req.body.password,
      });
      const accountJSON = serializeAccountAsJSON(account);

      res.status(HttpStatusCodes.CREATED).send(accountJSON);
    },
  );

  sendOTP = applicationController(
    async (req: Request<GenerateOTPParams>, res: Response) => {

      const account = await AccountService.sendOTP(req.body.contactNumber);

      const accountJSON = serializeAccountAsJSON(account);

      res.status(HttpStatusCodes.OK).send(accountJSON);
    },
  );

  verifyOTP = applicationController(
    async (req: Request<VerifyOTPParams>, res: Response) => {
      const account = await AccountService.verifyOTP(
        req.body.accountId,
        req.body.otp,
      );

      const accessToken = await AccessTokenService.createAccessTokenWithContactNumber({
        contactNumber: account.contactNumber,
      });

      const accessTokenJSON = serializeAccessTokenAsJSON(accessToken);

      res.status(HttpStatusCodes.OK).send(accessTokenJSON);
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
