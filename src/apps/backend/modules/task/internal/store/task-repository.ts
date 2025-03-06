import { ApplicationRepository } from '../../../application';

import { ShareTaskDB, ShareTaskDbSchema } from './share-task-db';
import { TaskDB, TaskDbSchema } from './task-db';

const TaskRepository = ApplicationRepository<TaskDB>('Task', TaskDbSchema);

const ShareTaskRepository = ApplicationRepository<ShareTaskDB>(
  'shared_tasks',
  ShareTaskDbSchema
);
export { ShareTaskRepository, TaskRepository };
