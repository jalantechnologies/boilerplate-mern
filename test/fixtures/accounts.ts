import { faker } from '@faker-js/faker';

import { CreateAccountParams } from '../../src/apps/backend/modules/account';
import AccountService from '../../src/apps/backend/modules/account/account-service';
import AccountRepository from '../../src/apps/backend/modules/account/internal/store/account-repository';

export default class AccountsFixture {
  public static async clear(): Promise<void> {
    await AccountRepository.remove();
  }

  public static async seedMany(
    numberOfEntries = 10,
  ): Promise<CreateAccountParams[]> {
    const data: CreateAccountParams[] = new Array(numberOfEntries)
      .fill('x')
      .map(() => ({
        username: faker.internet.email(),
        password: faker.internet.password(),
      }));

    await Promise.all(data.map((datum) => AccountService.createAccount(datum)));

    return data;
  }

  public static async seedOne(
    newAccountData?: CreateAccountParams,
  ): Promise<CreateAccountParams> {
    const data: CreateAccountParams = newAccountData || {
      username: faker.internet.email(),
      password: faker.internet.password(),
    };

    await AccountService.createAccount(data);
    return data;
  }
}
