import TaskReader from './internal/task-reader';
import TaskWriter from './internal/task-writer';
import { Types } from 'mongoose';
import {
  CreateTaskParams,
  DeleteTaskParams,
  GetAllTaskParams,
  GetTaskParams,
  Task,
  UpdateTaskParams,
} from './types';
import TaskRepository from './internal/store/task-repository';

export default class TaskService {
  public static async createTask(params: CreateTaskParams): Promise<Task> {
    return TaskWriter.createTask(params);
  }

  public static async deleteTask(params: DeleteTaskParams): Promise<void> {
    return TaskWriter.deleteTask(params);
  }

  public static async updateTask(params: UpdateTaskParams): Promise<Task> {
    return TaskWriter.updateTask(params);
  }

  public static async getTaskForAccount(params: GetTaskParams): Promise<Task> {
    return TaskReader.getTaskForAccount(params);
  }

  public static async getTasksForAccount(
    params: GetAllTaskParams,
  ): Promise<Task[]> {
    return TaskReader.getTasksForAccount(params);
  }

  public static async shareTask(
    taskId: Types.ObjectId,
    userIds: Types.ObjectId[],
  ): Promise<void> {
    await TaskWriter.shareTask(taskId, userIds);
  }

  public static async taskExists(taskId: Types.ObjectId): Promise<boolean> {
    const task = await TaskRepository.findOne({ _id: taskId, active: true });
    return !!task;
  }
}
