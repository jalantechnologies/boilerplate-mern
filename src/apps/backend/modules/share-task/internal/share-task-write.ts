import { CreateShareTaskParams, ShareTask } from '../types';

import ShareTaskUtil from './share-task-util';
import ShareTaskRepository from './store/share-task-repository';

export default class ShareTaskWriter {
  public static async createShareTask(
    params: CreateShareTaskParams
  ): Promise<ShareTask> {
    const createdShareTask = await ShareTaskRepository.create({
      sharedWith: params.sharedWith,
      task: params.taskId,
    });
    const populatedShareTask = await createdShareTask.populate('task', [
      'description',
      'account',
    ]);
    return ShareTaskUtil.convertTaskDBToTask(populatedShareTask);
  }
}
