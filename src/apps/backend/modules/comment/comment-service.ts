import CommentReader from './internal/comment-reader';
import CommentWriter from './internal/comment-writer';
import {
  Comment,
  CreateCommentParams,
  DeleteCommentParams,
  GetCommentsParams,
  UpdateCommentParams,
} from './types';

export default class CommentService {
  public static async createComment(
    params: CreateCommentParams
  ): Promise<Comment> {
    return CommentWriter.createComment(params);
  }

  public static async getComments(
    params: GetCommentsParams
  ): Promise<Comment[]> {
    return CommentReader.getCommentsForTask(params);
  }

  public static async updateComment(
    params: UpdateCommentParams
  ): Promise<Comment> {
    return CommentWriter.updateComment(params);
  }

  public static async deleteComment(
    params: DeleteCommentParams
  ): Promise<Comment> {
    return CommentWriter.deleteComment(params);
  }
}
