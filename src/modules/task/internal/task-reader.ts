import { GetAllTaskParams, Task } from '../types';

export default class TaskReader {
  public static getTask(params: GetTaskParams): Promise<Task> {
    // TODO: Implement this
    // If task with active as TRUE is not found, throw TaskNotFoundError
    // Otherwise return Task.
    // Please note that it should not return the Mongoose ORM JS object
    // as we want consumer to be not able to call any ORM related function
    // on the object. Rather, we want to send a simple JS object with the
    // properties tied to it by calling TaskUtil.convertTaskDBToTask
  }

  public static getTasks(params: GetAllTaskParams): Promise<Task[]> {
    // TODO: Implement this
    // Returns list of task based on params (paginated)
    // Please note that it should not return the Mongoose ORM JS object
    // as we want consumer to be not able to call any ORM related function
    // on the object. Rather, we want to send a simple JS object with the
    // properties tied to it by calling TaskUtil.convertTaskDBToTask
  }
}
