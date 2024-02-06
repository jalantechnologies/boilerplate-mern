import {
  CreateTaskParams,
  DeleteTaskParams,
  Task,
  TaskWithNameExistsError,
} from '../types';

import TaskRepository from './store/task-repository';
import TaskReader from './task-reader';
import TaskUtil from './task-util';

export default class TaskWriter {
  public static async createTask(params: CreateTaskParams): Promise<Task> {
    const existingTask = await TaskRepository.findOne({
      account: params.accountId,
      name: params.name,
      active: true,
    });
    if (existingTask) {
      throw new TaskWithNameExistsError(params.name);
    }

    const createdTask = await TaskRepository.create({
      account: params.accountId,
      name: params.name,
      active: true,
    });
    return TaskUtil.convertTaskDBToTask(createdTask);
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
