import { TaskNotFoundError } from '../../task';
import {
  Comment,
  CommentNotFoundError,
  GetCommentParams,
  GetCommentsParams,
  GetTaskParams,
} from '../types';

import CommentUtil from './comment-util';
import CommentRepository from './store/comment-repository';

export default class CommentReader {
  public static async getCommentsForTask(
    params: GetCommentsParams
  ): Promise<Comment[]> {
    await this.getTaskExists(params);
    const commentsDb = await CommentRepository.find({
      task: params.taskId,
    });

    return commentsDb.map((commentDb) =>
      CommentUtil.convertCommentDBToComment(commentDb)
    );
  }

  public static async getComment(params: GetCommentParams): Promise<Comment> {
    const commentDb = await CommentRepository.findOne({
      _id: params.commentId,
    });
    if (!commentDb) {
      throw new CommentNotFoundError(params.commentId);
    }

    return CommentUtil.convertCommentDBToComment(commentDb);
  }

  public static async getTaskExists(params: GetTaskParams): Promise<Comment> {
    const commentDb = await CommentRepository.findOne({
      task: params.taskId,
    });
    if (!commentDb) {
      throw new TaskNotFoundError(params.taskId);
    }

    return CommentUtil.convertCommentDBToComment(commentDb);
  }
}
