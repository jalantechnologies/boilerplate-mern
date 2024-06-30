import { CreateSharedTaskParams } from '../types';
import SharedTaskRepository from './store/share-task-repository';
import { SharedTaskDB } from './store/share-task-db';

export default class ShareTaskWriter {
  public static async shareTask(params: CreateSharedTaskParams): Promise<SharedTaskDB> {
    const sharedTask = await SharedTaskRepository.create({
      task: params.taskId,
      account: params.accountId,
    });
    return sharedTask;
  }
}
