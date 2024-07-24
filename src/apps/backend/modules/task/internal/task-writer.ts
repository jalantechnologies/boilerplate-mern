import {
  CreateTaskParams,
  DeleteTaskParams,
  ShareTaskParams,
  Task,
  TaskNotFoundError,
  UpdateTaskParams,
} from '../types';

import TaskRepository from './store/task-repository';
import TaskReader from './task-reader';
import TaskUtil from './task-util';

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
  public static async shareTask(params: ShareTaskParams): Promise<Task> {
    // First, find the task
    const task = await TaskRepository.findOne({
        _id: params.taskId,
        active: true,
    });

    if (!task) {
      console.log("no task");
        throw new TaskNotFoundError(params.taskId);
    }

    // Then, update the task's sharedAccounts
    const updatedTask = await TaskRepository.findOneAndUpdate(
        {
            _id: params.taskId,
            active: true,
        },
        {
            $set: {
                sharedAccounts: [...task.sharedAccounts , params.accountId],
            },
        },
        { new: true },
    );

    if (!updatedTask) {
      console.log("no task updated");
        throw new TaskNotFoundError(params.taskId);
    }

    return TaskUtil.convertTaskDBToTask(updatedTask);
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
}
