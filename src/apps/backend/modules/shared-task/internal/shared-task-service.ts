import { Types } from 'mongoose';
import SharedTaskRepository from './store/shared-task-repository';
import { SharedTaskDB } from './store/shared-task-db';

export default class SharedTaskService {
  public static async shareTask(
    taskId: Types.ObjectId,
    accountId: Types.ObjectId,
  ): Promise<SharedTaskDB> {
    const sharedTask = await SharedTaskRepository.create({
      task: taskId,
      account: accountId,
    });

    return sharedTask;
  }

  public static async getSharedTasks(
    accountId: Types.ObjectId,
  ): Promise<SharedTaskDB[]> {
    return SharedTaskRepository.find({
      account: accountId,
    });
  }
}
