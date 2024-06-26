import { Types } from 'mongoose';
import SharedTaskRepository from './store/share-task-repository';
import { SharedTaskDB } from './store/share-task-db';

export default class SharedTaskService {
  public static async shareTask(
    taskId: Types.ObjectId,
    userId: Types.ObjectId,
  ): Promise<SharedTaskDB> {
    const sharedTask = await SharedTaskRepository.create({
      taskId,
      userId,
    });

    return sharedTask;
  }

  public static async getSharedTasks(
    accountId: Types.ObjectId,
  ): Promise<SharedTaskDB[]> {
    return SharedTaskRepository.find({
      accountId,
    });
  }
}
