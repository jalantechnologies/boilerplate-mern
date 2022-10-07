import { faker } from '@faker-js/faker';

import AccountService from '../../src/apps/backend/modules/account/account-service';
import AccountRepository from '../../src/apps/backend/modules/account/internal/store/account-repository';
import { CreateAccountParams } from '../../src/apps/backend/modules/account/types';

export default class AccountsE2EDataManager {
  private static async checkRepository() {
    if (!AccountRepository.accountDB) {
      await AccountRepository.createDBConnection();
    }
  }

  public static async clear(): Promise<void> {
    await this.checkRepository();
    await AccountRepository.accountDB.remove();
  }

  public static async seedMany(
    numberOfEntries = 10,
  ): Promise<CreateAccountParams[]> {
    await this.checkRepository();

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
    await this.checkRepository();

    const data: CreateAccountParams = newAccountData || {
      username: faker.internet.email(),
      password: faker.internet.password(),
    };

    try {
      await AccountService.createAccount(data);

      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
}
