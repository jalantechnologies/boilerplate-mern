import { faker } from '@faker-js/faker';

import AccountService from '../../src/modules/account/account-service';
import AccountRepository from '../../src/modules/account/internal/store/account-repository';
import { CreateAccountParams } from '../../src/modules/account/types';

export default class AccountsE2EDataManager {
  private static async checkRepository() {
    if (!AccountRepository.accountDB) {
      await AccountRepository.createDBConnection();
    }
  }

  public static async clear() {
    await this.checkRepository();
    await AccountRepository.accountDB.remove();
  }

  public static async seedMany(numberOfEntries: number = 10) {
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

  public static async seedOne(newAccountData?: CreateAccountParams) {
    await this.checkRepository();

    const data: CreateAccountParams = newAccountData || {
      username: faker.internet.email(),
      password: faker.internet.password(),
    };

    await AccountService.createAccount(data);

    return data;
  }
}