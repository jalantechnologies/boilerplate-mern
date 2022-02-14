import {
  CreateTaskParams,
  DeleteTaskParams,
  GetTaskParams,
  Task,
  TaskWithNameExistsError,
} from '../types';
import TaskRepository from './store/task-repository';
import TaskReader from './task-reader';
import TaskUtil from './task-util';

export default class TaskWriter {
  public static async createTask(params: CreateTaskParams): Promise<Task> {
    const existingTask = await TaskRepository.taskDB.findOne({
      name: params.name,
    });
    if (existingTask) {
      throw new TaskWithNameExistsError(params.name);
    }
    const createdTask = await TaskRepository.taskDB.create({
      account: params.accountId,
      name: params.name,
      active: true,
    });
    return TaskUtil.convertTaskDBToTask(createdTask);
  }

  public static async deleteTask(params: DeleteTaskParams): Promise<void> {
    const taskParams: GetTaskParams = {
      accountId: params.accountId,
      taskId: params.taskId,
    };
    const task = await TaskReader.getTask(taskParams);
    await TaskRepository.taskDB.findOneAndUpdate(
      {
        _id: task.id,
      },
      {
        $set: {
          active: false,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        context: 'query',
      },
    );
  }
}
