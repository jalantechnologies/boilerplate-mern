import { ApplicationRepository } from '../../../application';
import { SharedTaskDB, SharedTaskDbSchema } from './task-sharing-db';

const SharedTaskRepository = ApplicationRepository<SharedTaskDB>(
  'SharedTask',
  SharedTaskDbSchema,
);

export default SharedTaskRepository;
