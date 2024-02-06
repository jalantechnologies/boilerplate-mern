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
    const taskDb = await TaskRepository.findOne({
      _id: params.taskId,
      account: params.accountId,
      active: true,
    });
    if (!taskDb) {
      throw new TaskNotFoundError(params.taskId);
    }

    return TaskUtil.convertTaskDBToTask(taskDb);
  }

  public static async getTaskByNameForAccount(params: GetTaskByNameParams): Promise<Task> {
    const taskDb = await TaskRepository.findOne({
      account: params.accountId,
      name: params.name,
      active: true,
    });
    if (!taskDb) {
      throw new TaskWithNameNotFoundError(params.name);
    }

    return TaskUtil.convertTaskDBToTask(taskDb);
  }

  public static async getTasksForAccount(params: GetAllTaskParams): Promise<Task []> {
    const totalTasksCount = await TaskRepository.countDocuments({
      account: params.accountId,
      active: true,
    });
    const paginationParams: PaginationParams = {
      page: (params.page) ? (params.page) : 1,
      size: (params.size) ? (params.size) : totalTasksCount,
    };
    const startIndex = (paginationParams.page - 1) * (paginationParams.size);

    const tasksDb = await TaskRepository
      .find({ account: params.accountId, active: true })
      .limit(paginationParams.size)
      .skip(startIndex);

    return tasksDb.map((taskDb) => TaskUtil.convertTaskDBToTask(taskDb));
  }
}
