import mongoose, { CallbackError, Connection } from 'mongoose';

import ConfigService from '../../../config/config-service';

import { AccountDB, accountDbSchema } from './account-db';

export default class AccountRepository {
  public static accountDB: mongoose.Model<AccountDB>;

  static async createDBConnection(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      const mongoURI = ConfigService.getStringValue('mongoDb.uri');
      mongoose.createConnection(
        mongoURI,
        {},
        (error: CallbackError, result: Connection): void => {
          if (error) {
            reject(error);
          } else {
            AccountRepository.accountDB = result.model(
              'Account',
              accountDbSchema,
            ) as unknown as mongoose.Model<AccountDB>;
            resolve(result);
          }
        },
      );
    });
  }
}
