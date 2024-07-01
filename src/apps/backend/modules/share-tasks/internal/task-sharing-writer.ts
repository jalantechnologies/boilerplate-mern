import { CreateTaskSharingParams } from '../types';
import TaskSharingRepository from './store/task-sharing-repository';
import { TaskSharingRecord } from './store/task-sharing-db';

export default class TaskSharingWriter {
  public static async shareTask(params: CreateTaskSharingParams): Promise<TaskSharingRecord> {
    const taskSharing = await TaskSharingRepository.create({
      task: params.taskId,
      user: params.userId,
    });
    return taskSharing;
  }
}
