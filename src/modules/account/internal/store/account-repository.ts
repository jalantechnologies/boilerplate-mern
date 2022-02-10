import mongoose from 'mongoose';
import ConfigService from '../../../config/config-service';
import IAccountDB from './account-db';
import accountSchema from './account-schema';

export default class AccountRepository {
  public static accountDb: mongoose.Model<IAccountDB>;

  static initDb(): void {
    const mongoURI = ConfigService.getStringValue('mongoDb.uri');
    const connection = mongoose.createConnection(mongoURI);
    AccountRepository.accountDb = connection.model('Account', accountSchema);
  }
}
