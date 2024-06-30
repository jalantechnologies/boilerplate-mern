import CommentReader from './internal/comment-reader';
import CommentWriter from './internal/comment-writer';
import { CreateCommentParams, EditCommentParams, GetCommentsParams, Comment } from './types';

export default class CommentService {
  public static async createComment(params: CreateCommentParams): Promise<Comment> {
    return CommentWriter.createComment(params);
  }

  public static async editComment(params: EditCommentParams): Promise<Comment | null> {
    return CommentWriter.editComment(params);
  }

  public static async deleteComment(commentId: string): Promise<void> {
    return CommentWriter.deleteComment(commentId);
  }

  public static async getComments(params: GetCommentsParams): Promise<Comment[]> {
    return CommentReader.getComments(params);
  }

  public static async replyToComment(params: CreateCommentParams): Promise<Comment> {
    return CommentWriter.replyToComment(params);
  }
}
