import mongoose from 'mongoose';

import { ConfigService } from '../config';
import { Logger } from '../logger';

const getDatabaseConnection = (): mongoose.Connection => {
  const mongoConnCaching: boolean = ConfigService.getValue('mongoDb.connCaching');
  const mongoURI: string = ConfigService.getValue('mongoDb.uri');

  if (mongoConnCaching) {
    mongoose
      .connect(mongoURI)
      .catch((err) => {
        Logger.error(err.message);
      });

    return mongoose.connection;
  }

  return mongoose.createConnection(mongoURI);
};

export default function ApplicationRepository<T>(
  name: string,
  schema: mongoose.Schema,
  collection?: string,
): mongoose.Model<T> {
  const connection = getDatabaseConnection();
  return connection.model<T>(name, schema, collection);
}
