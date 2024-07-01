import TaskSharingRepository from './store/task-sharing-repository';
import { GetTaskSharingParams } from '../types';
import { TaskSharingRecord } from './store/task-sharing-db';

export default class TaskSharingReader {
  public static async getSharedTasks(params: GetTaskSharingParams): Promise<TaskSharingRecord[]> {
    const taskSharingRecords = await TaskSharingRepository.find({
      user: params.userId,
    });
    return taskSharingRecords;
  }
}
