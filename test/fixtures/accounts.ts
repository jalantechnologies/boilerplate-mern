import { faker } from '@faker-js/faker';
import { CreateAccountParamsByUsernameAndPassword } from 'modules/account';
import AccountService from 'modules/account/account-service';
import AccountRepository from 'modules/account/internal/store/account-repository';

export default class AccountsFixture {
  public static async clear(): Promise<void> {
    await AccountRepository.remove();
  }

  public static async seedMany(
    numberOfEntries = 10
  ): Promise<CreateAccountParamsByUsernameAndPassword[]> {
    const data: CreateAccountParamsByUsernameAndPassword[] = new Array(
      numberOfEntries
    )
      .fill('x')
      .map(() => ({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        username: faker.internet.email(),
        password: faker.internet.password(),
      }));

    await Promise.all(
      data.map((datum) =>
        AccountService.createAccountByUsernameAndPassword(
          datum.firstName,
          datum.lastName,
          datum.password,
          datum.username
        )
      )
    );

    return data;
  }

  public static async seedOne(
    newAccountData?: CreateAccountParamsByUsernameAndPassword
  ): Promise<CreateAccountParamsByUsernameAndPassword> {
    const data: CreateAccountParamsByUsernameAndPassword = newAccountData || {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      username: faker.internet.email(),
      password: faker.internet.password(12),
    };

    await AccountService.createAccountByUsernameAndPassword(
      data.firstName,
      data.lastName,
      data.password,
      data.username
    );
    return data;
  }
}
