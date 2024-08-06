import { ApplicationRepository } from '../../../application';

import { ShareTaskRequestDB, ShareTaskRequestDbSchema } from './share-task-request-db';

const ShareTaskRequestRepository = ApplicationRepository<ShareTaskRequestDB>(
  'ShareTaskRequest',
  ShareTaskRequestDbSchema,
);

export default ShareTaskRequestRepository;