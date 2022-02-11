import { Task } from '../types';
import { TaskDB } from './store/task-db';

export default class TaskUtil {
  public static convertTaskDBToTask(taskDb: TaskDB): Task {
    const task = new Task();
    task.id = taskDb._id.toString();
    task.account = taskDb.account.toString();
    task.active = taskDb.active;
    task.name = taskDb.name;
    return task;
  }
}
