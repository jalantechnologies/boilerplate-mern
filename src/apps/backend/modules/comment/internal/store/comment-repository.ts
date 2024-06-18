import { ApplicationRepository } from '../../../application';

import { CommentDB, CommentDbSchema } from './comment-db';

const CommentRepository = ApplicationRepository<CommentDB>(
  'Comment',
  CommentDbSchema,
);

export default CommentRepository;
