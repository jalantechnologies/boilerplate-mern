import mongoose, { CallbackError, Connection } from 'mongoose';

import ConfigService from '../../../config/config-service';

import { OrganizationAccountDB, organizationAccountDbSchema } from './organization-account-db';

export default class OrganizationAccountRepository {
  public static organizationAccountDB: mongoose.Model<OrganizationAccountDB>;

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
            OrganizationAccountRepository.organizationAccountDB = result.model(
              'OrganizationAccount',
              organizationAccountDbSchema,
            ) as unknown as mongoose.Model<OrganizationAccountDB>;
            resolve(result);
          }
        },
      );
    });
  }
}
