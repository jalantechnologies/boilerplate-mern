import { ApplicationRepository } from '../../../application';
import { CommentDB, CommentSchema } from './comment-db';

const CommentRepository = ApplicationRepository<CommentDB>(
  'Comment',
  CommentSchema,
);

export default CommentRepository;
