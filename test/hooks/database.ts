import config from 'config';
import mongoose from 'mongoose';

const mongoDbURI = config.get('mongoDb.uri');

export const cleanDatabase = async (): Promise<void> => {
  const collections = await mongoose.connection.db.collections();

  await Promise.all(collections.map((collection) => collection.deleteMany({})));
};

export const connectDatabase = async (): Promise<void> => {
  await mongoose.connect(mongoDbURI as string, {
    serverSelectionTimeoutMS: 5000,
  });

  const db = mongoose.connection.db.admin();
  const dbPingResult = await db.ping();

  if (dbPingResult?.ok !== 1) {
    throw new Error(
      `Connection to database failed - ${JSON.stringify(dbPingResult)}`,
    );
  }
};

export const disconnectDatabase = async (): Promise<void> => {
  await Promise.all(
    mongoose.connections.map((connection) => connection.close()),
  );
};
