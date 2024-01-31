import faker from '@faker-js/faker';

import { AccessToken } from '../../src/apps/backend/modules/access-token';
import AccessTokenService from '../../src/apps/backend/modules/access-token/access-token-service';
import { Account, CreateAccountParams, AccountService } from '../../src/apps/backend/modules/account';

export const createAccount = async (params?: {
  accountParams?: Partial<CreateAccountParams>,
}): Promise<{
  accessToken: AccessToken,
  account: Account,
}> => {
  const fName = faker.name.firstName();
  const lName = faker.name.lastName();
  const username = faker.internet.email(fName, lName);
  const password = faker.internet.password(8);

  const accountCreateParams = {
    username,
    password,
    firstName: fName,
    lastName: lName,
    ...params?.accountParams && params.accountParams,
  };

  const account = await AccountService.createAccount(accountCreateParams);

  const accessToken = await AccessTokenService.createAccessToken({
    username: accountCreateParams.username,
    password: accountCreateParams.password,
  });

  return {
    account,
    accessToken,
  };
};
