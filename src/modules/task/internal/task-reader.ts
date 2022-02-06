import { GetAllTaskParams, Task } from '../types';

export default class TaskReader {
  public static getTask(params: GetTaskParams): Promise<Task> {
    // TODO: Implement this
    // If task with active as TRUE is not found, throw TaskNotFoundError
    // If task exists but it does not belong to accountId in params,
    //    throw TaskUnAuthorizedAccessError
    // Otherwise return Task
  }

  public static getTasks(params: GetAllTaskParams): Promise<Task[]> {
    // TODO: Implement this
    // Returns list of task based on params (paginated)
  }
}
