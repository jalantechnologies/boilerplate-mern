import { Task } from '../types';

import { TaskDB } from './store/task-db';

export default class TaskUtil {
  public static convertTaskDBToTask(taskDb: TaskDB): Task {
    const task = new Task();
    task.id = taskDb._id.toString();
    task.account = taskDb.account.toString();
    task.description = taskDb.description;
    task.title = taskDb.title;
    task.sharedWith = taskDb.sharedWith.map(toString);
    return task;
  }
}
