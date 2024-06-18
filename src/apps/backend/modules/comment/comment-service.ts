import CommentReader from './internal/comment-reader';
import CommentWriter from './internal/comment-writer';
import {
  CreateCommentParams,
  DeleteCommentParams,
  GetTaskCommentsParams,
  Comment,
  UpdateCommentParams,
  GetCommentParams,
} from './types';

export default class CommentService {
  public static async createComment(params: CreateCommentParams): Promise<Comment> {
    return CommentWriter.createComment(params);
  }

  public static async deleteComment(params: DeleteCommentParams): Promise<void> {
    return CommentWriter.deleteComment(params);
  }

  public static async updateComment(params: UpdateCommentParams): Promise<Comment> {
    return CommentWriter.updateComment(params);
  }

  public static async getCommentsForTask(params: GetTaskCommentsParams): Promise<Comment[]> {
    return CommentReader.getCommentsForTask(params);
  }

  public static async getComment(params: GetCommentParams): Promise<Comment> {
    return CommentReader.getComment(params);
  }
}
