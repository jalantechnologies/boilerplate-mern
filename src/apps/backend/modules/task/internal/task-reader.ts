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
  // Fetch a single task for a specific user
  public static async getTaskForAccount(params: GetTaskParams): Promise<Task> {
    const taskDb = await TaskRepository.findOne({
      _id: params.taskId,
      active: true, // Removed account filter to allow public access
    });

    if (!taskDb) {
      throw new TaskNotFoundError(params.taskId);
    }

    return TaskUtil.convertTaskDBToTask(taskDb);
  }

  // Fetch all tasks for a specific user (old method)
  public static async getTasksForAccount(
    params: GetAllTaskParams,
  ): Promise<Task[]> {
    const totalTasksCount = await TaskRepository.countDocuments({
      account: params.accountId,
      active: true,
    });

    const paginationParams: PaginationParams = {
      page: params.page ? params.page : 1,
      size: params.size ? params.size : totalTasksCount,
    };

    const startIndex = (paginationParams.page - 1) * paginationParams.size;

    const tasksDb = await TaskRepository.find({
      account: params.accountId,
      active: true,
    })
      .limit(paginationParams.size)
      .skip(startIndex);

    return tasksDb.map((taskDb) => TaskUtil.convertTaskDBToTask(taskDb));
  }

  // New method: Fetch all tasks from all users
  public static async getAllTasks(params: GetAllTaskParams): Promise<Task[]> {
    const totalTasksCount = await TaskRepository.countDocuments({
      active: true,
    });

    const paginationParams: PaginationParams = {
      page: params.page ? params.page : 1,
      size: params.size ? params.size : totalTasksCount,
    };

    const startIndex = (paginationParams.page - 1) * paginationParams.size;

    const tasksDb = await TaskRepository.find({ active: true })
      .limit(paginationParams.size)
      .skip(startIndex);

    return tasksDb.map((taskDb) => TaskUtil.convertTaskDBToTask(taskDb));
  }
}
