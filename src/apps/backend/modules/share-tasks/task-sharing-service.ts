import TaskSharingReader from './internal/task-sharing-reader';
import TaskSharingWriter from './internal/task-sharing-writer';
import { CreateTaskSharingParams, GetTaskSharingParams } from './types';
import { TaskSharingRecord } from './internal/store/task-sharing-db';

export default class TaskSharingService {
  public static async shareTask(params: CreateTaskSharingParams): Promise<TaskSharingRecord> {
    return TaskSharingWriter.shareTask(params);
  }

  public static async getSharedTasks(params: GetTaskSharingParams): Promise<TaskSharingRecord[]> {
    return TaskSharingReader.getSharedTasks(params);
  }
}
