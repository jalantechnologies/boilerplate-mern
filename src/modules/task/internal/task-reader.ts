import {
  GetAllTaskParams,
  GetTaskParams,
  Task,
  TaskNotFoundError,
} from '../types';
import TaskRepository from './store/task-repository';
import TaskUtil from './task-util';

export default class TaskReader {
  public static async getTask(params: GetTaskParams): Promise<Task> {
    const task = await TaskRepository.task.findOne({
      _id: params.taskId,
      account: params.accountId,
      active: true,
    });
    if (!task) {
      throw new TaskNotFoundError(params.taskId);
    }
    return TaskUtil.convertTaskDBToTask(task);
  }

  public static async getTasks(params: GetAllTaskParams): Promise<Task []> {
    let page = 1;
    let size = 5;
    if (params.page) {
      page = params.page;
    }
    if (params.size) {
      size = params.size;
    }
    const startIndex = (page - 1) * size;
    const tasks = await TaskRepository.task
      .find({ account: params.accountId })
      .limit(size)
      .skip(startIndex);
    const dbTasks = tasks.map((task) => TaskUtil.convertTaskDBToTask(task));
    return dbTasks;
  }
}
