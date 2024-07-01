import { TaskSharing } from '../types';
import { TaskSharingRecord } from '../internal/store/task-sharing-db';
import TaskSharingUtil from '../internal/task-sharing-util';

export const formatTaskSharingToJSON = (taskSharingRecord: TaskSharingRecord): TaskSharing => {
  return TaskSharingUtil.convertTaskSharingRecordToTaskSharing(taskSharingRecord);
};
