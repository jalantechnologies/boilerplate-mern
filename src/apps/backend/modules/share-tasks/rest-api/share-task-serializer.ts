// share-task-serializer.ts
import { SharedTaskDB } from '../internal/store/share-task-db';

export const serializeSharedTaskAsJSON = (sharedTask: SharedTaskDB) => {
  return {
    id: sharedTask._id,
    taskId: sharedTask.taskId,
    userId: sharedTask.userId,
  };
};
