import {
  CreateTaskParams,
  DeleteTaskParams,
  GetAllTaskParams,
  GetTaskParams,
  Task,
  UpdateTaskParams,
} from 'backend/modules/task';
import TaskReader from 'backend/modules/task/internal/task-reader';
import TaskWriter from 'backend/modules/task/internal/task-writer';

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
    params: GetAllTaskParams
  ): Promise<Task[]> {
    return TaskReader.getTasksForAccount(params);
  }
}
