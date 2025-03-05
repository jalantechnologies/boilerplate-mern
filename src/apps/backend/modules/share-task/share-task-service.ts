import AccountReader from '../account/internal/account-reader';
import TaskReader from '../task/internal/task-reader';

import ShareTaskWriter from './internal/share-task-write';
import { CreateShareTaskParams, ShareTask } from './types';

export default class ShareTaskService {
  public static async createShareTask(
    params: CreateShareTaskParams
  ): Promise<ShareTask> {
    await AccountReader.getAccountById(params.sharedWith);
    await TaskReader.getTaskForAccount(params);
    return ShareTaskWriter.createShareTask(params);
  }
}
