import SharedTaskRepository from './store/share-task-repository';
import { GetSharedTasksParams } from '../types';
import { SharedTaskDB } from './store/share-task-db';
export default class ShareTaskReader {
  public static async getSharedTasks(params: GetSharedTasksParams): Promise<SharedTaskDB[]> {
    const sharedTasksDb = await SharedTaskRepository.find({
      account: params.accountId,
    });
    return sharedTasksDb;
  }
}
