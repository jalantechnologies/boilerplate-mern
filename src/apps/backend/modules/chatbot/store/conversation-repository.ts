import { ApplicationRepository } from '../../application';

import { ConversationDB, ConversationDbSchema } from './conversation-db';

const ConversationRepository = ApplicationRepository<ConversationDB>(
  'conversations',
  ConversationDbSchema,
);

export default ConversationRepository;
