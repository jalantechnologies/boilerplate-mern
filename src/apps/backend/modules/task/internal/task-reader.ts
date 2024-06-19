import { Types } from 'mongoose';
import {
  GetAllTaskParams,
  GetTaskParams,
  Task,
  TaskNotFoundError,
  PaginationParams,
} from '../types';
import SharedTaskRepository from './store/shared-task-repository';

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

  public static async getSharedTasks(params: {
    accountId: Types.ObjectId;
  }): Promise<Task[]> {
    const sharedTasksDb = await SharedTaskRepository.find({
      userId: params.accountId,
    });
    const tasks = await Promise.all(
      sharedTasksDb.map(async (sharedTask) => {
        const taskDb = await TaskRepository.findOne({
          _id: sharedTask.taskId,
          active: true,
        });
        return taskDb ? TaskUtil.convertTaskDBToTask(taskDb) : null;
      }),
    );
    return tasks.filter((task) => task !== null) as Task[];
  }
}
