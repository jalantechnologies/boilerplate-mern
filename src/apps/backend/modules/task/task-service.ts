import TaskReader from './internal/task-reader';
import TaskWriter from './internal/task-writer';
import {
  CreateTaskParams,
  DeleteTaskParams,
  GetAllTaskParams,
  GetTaskParams,
  ShareTasksParams,
  Task,
  UpdateTaskParams,
} from './types';

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

  public static async shareTasks(params: ShareTasksParams): Promise<void> {
    TaskWriter.shareTasks(params);
  }
}
