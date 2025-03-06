import { ShareTask, Task } from '../types';

import { ShareTaskDB } from './store/share-task-db';
import { TaskDB } from './store/task-db';

export default class TaskUtil {
  public static convertTaskDBToTask(taskDb: TaskDB): Task {
    const task = new Task();
    task.id = taskDb._id.toString();
    task.account = taskDb.account.toString();
    task.description = taskDb.description;
    task.title = taskDb.title;
    return task;
  }

  public static convertShareTaskDBToTask(shareTaskDb: ShareTaskDB): ShareTask {
    const shareTask = new ShareTask();
    shareTask.taskId = shareTaskDb.task;
    shareTask.sharedWith = shareTaskDb.sharedWith.toString();
    return shareTask;
  }
}
