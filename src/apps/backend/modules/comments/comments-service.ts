
import {
    CreateCommentParams,
    DeleteCommentParams,
    Comment,
    UpdateCommentParams,
  } from './types'

  import CommentWriter from './internal/comment-writer';
  import CommentReader from './internal/comment-reader';

  export default class CommentService {
    public static async createComment(
      params: CreateCommentParams,
    ): Promise<Comment> {
      return CommentWriter.createComment(params);
    }

    public static async updateComment(
      params: UpdateCommentParams,
    ): Promise<Comment> {
      return CommentWriter.updateComment(params);
    }

    public static async deleteComment(
      params: DeleteCommentParams,
    ): Promise<void> {
      return CommentWriter.deleteComment(params);
    }

    public static async getCommentsForTask(taskId: string): Promise<Comment[]> {
      return CommentReader.getCommentsForTask(taskId);
    }
  }