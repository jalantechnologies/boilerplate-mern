import { CreateTaskParams, DeleteTaskParams, Task } from '../types';
import TaskReader from './task-reader';

export default class TaskWriter {
  public static async createTask(params: CreateTaskParams): Promise<Task> {
    // TODO: Implement this
  }

  public static async deleteTask(params: DeleteTaskParams): Promise<void> {
    const task = await TaskReader.getTask(params);

    // TODO: Implement this
    // Update the active flag on task as false
  }
}
