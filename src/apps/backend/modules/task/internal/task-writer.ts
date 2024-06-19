import {
  CreateTaskParams,
  DeleteTaskParams,
  Task,
  TaskNotFoundError,
  UpdateTaskParams,
} from '../types';

import TaskRepository from './store/task-repository';
import SharedTaskRepository from './store/shared-task-repository';
import TaskReader from './task-reader';
import TaskUtil from './task-util';
import { Types } from 'mongoose';

export default class TaskWriter {
  public static async createTask(params: CreateTaskParams): Promise<Task> {
    const createdTask = await TaskRepository.create({
      account: params.accountId,
      description: params.description,
      title: params.title,
      active: true,
    });
    return TaskUtil.convertTaskDBToTask(createdTask);
  }

  public static async updateTask(params: UpdateTaskParams): Promise<Task> {
    const task = await TaskRepository.findOneAndUpdate(
      {
        account: params.accountId,
        _id: params.taskId,
        active: true,
      },
      {
        $set: {
          description: params.description,
          title: params.title,
        },
      },
      { new: true },
    );

    if (!task) {
      throw new TaskNotFoundError(params.taskId);
    }

    return TaskUtil.convertTaskDBToTask(task);
  }

  public static async deleteTask(params: DeleteTaskParams): Promise<void> {
    const task = await TaskReader.getTaskForAccount({
      accountId: params.accountId,
      taskId: params.taskId,
    });

    await TaskRepository.findOneAndUpdate(
      {
        _id: task.id,
      },
      {
        $set: {
          active: false,
        },
      },
    );
  }

  public static async shareTask(
    taskId: Types.ObjectId,
    userIds: Types.ObjectId[],
  ): Promise<void> {
    const sharedTasks = userIds.map((userId) => ({
      taskId,
      userId,
    }));

    await SharedTaskRepository.insertMany(sharedTasks);
  }
}
