import mongoose, { CallbackError, Connection } from 'mongoose';
import ConfigService from '../../../config/config-service';
import { TaskDb, taskDBSchema } from './task-db';

export default class TaskRepository {
  public static task: mongoose.Model<TaskDb>;

  static async createDBConnection(): Promise<Connection> {
    return new Promise((resolve, reject) => {
      mongoose.createConnection(
        ConfigService.getStringValue('mongoDb.uri'),
        {},
        (error: CallbackError, result: Connection): void => {
          if (error) {
            reject(error);
          } else {
            TaskRepository.task = result.model('Task', taskDBSchema);
            resolve(result);
          }
        },
      );
    });
  }
}
