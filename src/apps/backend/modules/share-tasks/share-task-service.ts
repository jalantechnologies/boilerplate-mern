import ShareTaskReader from './internal/share-task-reader';
import ShareTaskWriter from './internal/share-task-writer';
import { CreateSharedTaskParams, GetSharedTasksParams} from './types';
import { SharedTaskDB } from './internal/store/share-task-db';

export default class ShareTaskService {
  public static async shareTask(params: CreateSharedTaskParams): Promise<SharedTaskDB> {
    return ShareTaskWriter.shareTask(params);
  }

  public static async getSharedTask(params: GetSharedTasksParams): Promise<SharedTaskDB[]> {
    return ShareTaskReader.getSharedTasks(params);
  }
}
