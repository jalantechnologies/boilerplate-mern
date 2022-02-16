import TaskReader from './internal/task-reader';
import TaskWriter from './internal/task-writer';
import {
  CreateTaskParams,
  DeleteTaskParams,
  GetAllTaskParams,
  GetTaskParams,
  GetTaskByNameParams,
  Task,
} from './types';

export default class TaskService {
  public static async createTask(params: CreateTaskParams): Promise<Task> {
    return TaskWriter.createTask(params);
  }

  public static async deleteTask(params: DeleteTaskParams): Promise<void> {
    return TaskWriter.deleteTask(params);
  }

  public static async getTask(params: GetTaskParams): Promise<Task> {
    return TaskReader.getTask(params);
  }

  public static async getTaskByName(params: GetTaskByNameParams): Promise<Task> {
    return TaskReader.getTaskByName(params);
  }

  public static async getTasks(params: GetAllTaskParams): Promise<Task[]> {
    return TaskReader.getTasks(params);
  }

  public static async getTaskById(taskId: string): Promise<Task> {
    return TaskReader.getTaskById(taskId);
  }
}
