import TaskReader from './internal/task-reader';
import TaskWriter from './internal/task-writer';
import {
  CreateTaskParams, DeleteTaskParams, GetAllTaskParams, GetTaskParams, Task,
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

  public static async getTasks(params: GetAllTaskParams): Promise<Task[]> {
    return TaskReader.getTasks(params);
  }
}
