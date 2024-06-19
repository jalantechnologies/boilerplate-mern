// task-writer.ts
import {
  CreateTaskParams,
  DeleteTaskParams,
  Task,
  TaskNotFoundError,
  UpdateTaskParams,
  ShareTaskParams,
} from '../types';

import TaskRepository from './store/task-repository';
import TaskReader from './task-reader';
import TaskUtil from './task-util';
import { Types } from 'mongoose'; // Import Types from mongoose

export default class TaskWriter {
  public static async createTask(params: CreateTaskParams): Promise<Task> {
    const createdTask = await TaskRepository.create({
      account: params.accountId,
      description: params.description,
      title: params.title,
      active: true,
      shared_with: params.shared_with || [], // Include shared_with if provided
    });
    return TaskUtil.convertTaskDBToTask(createdTask);
  }

  public static async updateTask(params: UpdateTaskParams): Promise<Task> {
    const task = await TaskRepository.findOneAndUpdate(
      {
        _id: params.taskId,
        account: params.accountId,
        active: true,
      },
      {
        $set: {
          description: params.description,
          title: params.title,
          shared_with: params.shared_with || [], // Update shared_with if provided
        },
      },
      { new: true }
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
      }
    );
  }

  public static async shareTask(params: ShareTaskParams): Promise<Task> {
    const { taskId, accountId, userIds } = params;
  
    // Convert user IDs to Mongoose ObjectId type
    const objectIdUserIds = userIds.map(id => new Types.ObjectId(id));
  
    const task = await TaskRepository.findOneAndUpdate(
      {
        _id: taskId,
        account: accountId,
      },
      {
        $addToSet: {
          shared_with: { $each: objectIdUserIds },
        },
      },
      { new: true }
    );
  
    if (!task) {
      throw new TaskNotFoundError(taskId);
    }
  
    return TaskUtil.convertTaskDBToTask(task);
  }
}
