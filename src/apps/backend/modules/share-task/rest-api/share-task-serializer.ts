import { ShareTask } from '../types';

export const serializeShareTaskAsJSON = (shareTask: ShareTask): unknown => ({
  task: shareTask.taskId,
  sharedWith: shareTask.sharedWith,
  message: 'Shared Succcefully.',
});
