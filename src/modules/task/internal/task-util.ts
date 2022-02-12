import { Task } from '../types';
import { TaskDb } from './store/task-db';

export default class TaskUtil {
  public static convertTaskDBToTask(taskDb: TaskDb): Task {
    const task = new Task();
    task.id = taskDb._id.toString();
    task.account = taskDb.account.toString();
    task.name = taskDb.name;
    return task;
  }
}
