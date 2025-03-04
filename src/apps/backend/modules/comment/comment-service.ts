import CommentWriter from './internal/comment-writer';
import { Comment, CreateCommentParams } from './types';

export default class CommentService {
  public static async createComment(
    params: CreateCommentParams
  ): Promise<Comment> {
    return CommentWriter.createComment(params);
  }
}
