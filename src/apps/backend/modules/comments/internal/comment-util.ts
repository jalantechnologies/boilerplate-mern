import { Comment } from '../types';
import { CommentDB } from './store/comment-db';

export default class CommentUtil {
  public static convertCommentDBToComment(commentDb: CommentDB): Comment {
    return new Comment(
      commentDb._id.toString(),
      commentDb.task.toString(),
      commentDb.user.toString(),
      commentDb.comment,
      commentDb.active,
      commentDb.createdAt,
      commentDb.updatedAt
    );
  }
}
