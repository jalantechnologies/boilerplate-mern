import { ApplicationRepository } from '../../../application';

import { CommentDB, CommentDbSchema } from './db';

const CommentRepository = ApplicationRepository<CommentDB>('Comment', CommentDbSchema);

export default CommentRepository;
