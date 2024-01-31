import mongoose from 'mongoose';

import { ConfigService } from '../config';
import { Logger } from '../logger';

const getDatabaseConnection = (): mongoose.Connection => {
  const mongoConnCaching: boolean = ConfigService.getValue('mongoDb.connCaching');
  const mongoURI: string = ConfigService.getValue('mongoDb.uri');

  if (mongoConnCaching) {
    mongoose
      .connect(mongoURI)
      .catch((err: Error) => {
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

  // TODO: Typings for repositories is not working as expected, this needs
  //  to be fixed.
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return connection.model<T>(name, schema, collection);
}
