import { ApplicationRepository } from '../../../application';

import { ShareTaskDB, ShareTaskDbSchema } from './share-task-db';

const ShareTaskRepository = ApplicationRepository<ShareTaskDB>(
  'shared_tasks',
  ShareTaskDbSchema
);

export default ShareTaskRepository;
