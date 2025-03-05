import { ShareTask } from '../types';

import { ShareTaskDB } from './store/share-task-db';

export default class ShareTaskUtil {
  public static convertTaskDBToTask(shareTaskDb: ShareTaskDB): ShareTask {
    const sareTask = new ShareTask();
    sareTask.taskId = shareTaskDb.task;
    sareTask.sharedWith = shareTaskDb.sharedWith.toString();
    return sareTask;
  }
}
