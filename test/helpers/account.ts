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
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const username = faker.internet.email(firstName, lastName);
  const password = faker.internet.password(8);

  const accountCreateParams = {
    username,
    password,
    firstName,
    lastName,
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
