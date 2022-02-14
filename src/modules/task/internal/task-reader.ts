import {
  GetAllTaskParams,
  GetTaskParams,
  Task,
  TaskNotFoundError,
  PaginationParams,
} from '../types';
import TaskRepository from './store/task-repository';
import TaskUtil from './task-util';

export default class TaskReader {
  public static async getTask(params: GetTaskParams): Promise<Task> {
    const task = await TaskRepository.taskDB.findOne({
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
    const paginationParams: PaginationParams = {
      page: (params.page) ? (params.page) : 1,
      size: (params.size) ? (params.size) : 5,
    };
    const startIndex = (paginationParams.page - 1) * (paginationParams.size);
    const tasks = await TaskRepository.taskDB
      .find({ account: params.accountId, active: true })
      .limit(paginationParams.size)
      .skip(startIndex);
    const dbTasks = tasks.map((task) => TaskUtil.convertTaskDBToTask(task));
    return dbTasks;
  }

  public static async getTaskById(taskId: string): Promise<Task> {
    const task = await TaskRepository.taskDB.findOne({
      _id: taskId,
      active: true,
    });
    if (!task) {
      throw new TaskNotFoundError(taskId);
    }
    return TaskUtil.convertTaskDBToTask(task);
  }
}
