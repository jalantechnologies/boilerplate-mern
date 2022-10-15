import {
  GetAllTaskParams,
  GetTaskParams,
  Task,
  TaskNotFoundError,
  PaginationParams,
  GetTaskByNameParams,
  TaskWithNameNotFoundError,
} from '../types';

import TaskRepository from './store/task-repository';
import TaskUtil from './task-util';

export default class TaskReader {
  public static async getTaskForAccount(params: GetTaskParams): Promise<Task> {
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

  public static async getTaskByNameForAccount(params: GetTaskByNameParams): Promise<Task> {
    const task = await TaskRepository.taskDB.findOne({
      account: params.accountId,
      name: params.name,
      active: true,
    });
    if (!task) {
      throw new TaskWithNameNotFoundError(params.name);
    }
    return TaskUtil.convertTaskDBToTask(task);
  }

  public static async getTasksForAccount(params: GetAllTaskParams): Promise<Task []> {
    const totalTasksCount = await TaskRepository.taskDB
      .countDocuments({
        account: params.accountId,
        active: true,
      });
    const paginationParams: PaginationParams = {
      page: (params.page) ? (params.page) : 1,
      size: (params.size) ? (params.size) : totalTasksCount,
    };
    const startIndex = (paginationParams.page - 1) * (paginationParams.size);
    const tasks = await TaskRepository.taskDB
      .find({ account: params.accountId, active: true })
      .limit(paginationParams.size)
      .skip(startIndex);
    return tasks.map((task) => TaskUtil.convertTaskDBToTask(task));
  }
}
