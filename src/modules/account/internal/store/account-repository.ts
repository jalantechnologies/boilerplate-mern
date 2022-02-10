import mongoose from 'mongoose';
import ConfigService from '../../../config/config-service';
import AccountDB from '../account-db';
import accountSchema from './account-schema';

export default class AccountRepository {
  private static connection: mongoose.Connection;

  private static account: mongoose.Model<mongoose.Document>;

  static initDb(): void {
    const mongoURI = ConfigService.getStringValue('mongoDb.uri');
    AccountRepository.connection = mongoose.createConnection(mongoURI);
    AccountRepository.account = AccountRepository.connection.model(
      'Account',
      accountSchema,
    );
  }

  static async findOne(
    data?: unknown,
    projection?: unknown,
    options?: unknown,
  ): Promise<AccountDB> {
    const resultPromise = AccountRepository.account
      .findOne(data, projection, options)
      .exec();

    const result = await resultPromise;
    return result as unknown as AccountDB;
  }

  static async create(data: unknown, options?: unknown): Promise<AccountDB> {
    const result = await AccountRepository.account.create(data, options);
    return result as unknown as AccountDB;
  }
}
