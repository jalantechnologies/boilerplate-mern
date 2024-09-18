import mongoose, { Document as MongooseDocument, Types } from 'mongoose';

import { ConfigService } from '../config';
import { Logger } from '../logger';

const getDatabaseConnection = (): mongoose.Connection => {
  const mongoConnCaching: boolean = ConfigService.getValue(
    'mongoDb.connCaching',
  );
  const mongoURI: string = ConfigService.getValue('mongoDb.uri');

  if (mongoConnCaching) {
    mongoose.connect(mongoURI).catch((err: Error) => {
      Logger.error(err.message);
    });

    return mongoose.connection;
  }

  return mongoose.createConnection(mongoURI);
};

export default function ApplicationRepository<T>(
  name: string,
  schema: mongoose.Schema<T>,
  collection?: string,
): mongoose.Model<T> {
  const connection = getDatabaseConnection();

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  connection.syncIndexes();

  return connection.model<T>(name, schema, collection);
}

export type Document<T> = MongooseDocument<unknown, unknown, T> &
  T &
  Required<{ _id: Types.ObjectId }>;
