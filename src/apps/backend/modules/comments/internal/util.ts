import { Comment } from '../types';
import { CommentDB } from './store/db';

export default class CommentUtil {
  public static convertCommentDBToComment(commentDb: CommentDB): Comment {
    return {
      id: commentDb._id.toString(),
      taskId: commentDb.taskId.toString(),
      userId: commentDb.userId.toString(),
      text: commentDb.content, 
      createdAt: commentDb.createdAt,
    };
  }
}
