import { ShareTask, Task } from '../types';

export const serializeTaskAsJSON = (task: Task): unknown => ({
  id: task.id,
  account: task.account,
  description: task.description,
  title: task.title,
});

export const serializeShareTaskAsJSON = (shareTask: ShareTask): unknown => ({
  task: shareTask.taskId,
  sharedWith: shareTask.sharedWith,
});
