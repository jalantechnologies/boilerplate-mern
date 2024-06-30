import { ApplicationRepository } from '../../../application';
import { SharedTaskDB, SharedTaskDbSchema } from './share-task-db';

const SharedTaskRepository = ApplicationRepository<SharedTaskDB>(
  'SharedTask',
  SharedTaskDbSchema,
);

export default SharedTaskRepository;
