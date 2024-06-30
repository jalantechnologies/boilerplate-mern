import { SharedTask } from '../types';
import { SharedTaskDB } from '../internal/store/share-task-db';
import ShareTaskUtil from '../internal/share-task-util';

export const serializeSharedTaskAsJSON = (sharedTaskDb: SharedTaskDB): SharedTask => {
  return ShareTaskUtil.convertSharedTaskDBToSharedTask(sharedTaskDb);
};
