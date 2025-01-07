import { ApplicationRepository } from '../../application';

import { ConversationMessageDB, ConversationMessageDbSchema } from './conversation-message-db';

const ConversationMessageRepository = ApplicationRepository<ConversationMessageDB>(
  'conversation-chats',
  ConversationMessageDbSchema,
);

export default ConversationMessageRepository;
