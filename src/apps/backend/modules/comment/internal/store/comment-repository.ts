import { ApplicationRepository } from '../../../application';

import { CommentDB, CommentDbSchema } from './comment-db';

const CommentRepository = ApplicationRepository<CommentDB>(
  'comments',
  CommentDbSchema
);

export default CommentRepository;
