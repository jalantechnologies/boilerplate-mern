import { SharedTask } from '../types';
import { SharedTaskDB } from '../internal/store/share-task-db';

export default class ShareTaskUtil {
  public static convertSharedTaskDBToSharedTask(sharedTaskDb: SharedTaskDB): SharedTask {
    return {
      id: sharedTaskDb._id.toString(),
      taskId: sharedTaskDb.task.toString(),
      accountId: sharedTaskDb.account.toString(),
    };
  }
}
