import mongoose, { CallbackError, Connection } from 'mongoose';

import ConfigService from '../../../config/config-service';

import { TaskDB, taskDbSchema } from './task-db';

export default class TaskRepository {
  public static taskDB: mongoose.Model<TaskDB>;

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
            TaskRepository.taskDB = result.model(
              'Task',
              taskDbSchema,
            ) as unknown as mongoose.Model<TaskDB>;
            resolve(result);
          }
        },
      );
    });
  }
}
