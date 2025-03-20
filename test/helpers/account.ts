import faker from '@faker-js/faker';
import { Account, CreateAccountParams, AccountService } from 'modules/account';
import { AuthenticationService, AccessToken } from 'modules/authentication';

export const createAccount = async (params?: {
  accountParams?: Partial<CreateAccountParams>;
}): Promise<{
  accessToken: AccessToken;
  account: Account;
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
    ...(params?.accountParams && params.accountParams),
  };

  const account = await AccountService.createAccountByUsernameAndPassword(
    accountCreateParams.firstName,
    accountCreateParams.lastName,
    accountCreateParams.password,
    accountCreateParams.username
  );

  const accessToken =
    await AuthenticationService.createAccessTokenByUsernameAndPassword(
      accountCreateParams.password,
      accountCreateParams.username
    );

  return {
    account,
    accessToken,
  };
};
