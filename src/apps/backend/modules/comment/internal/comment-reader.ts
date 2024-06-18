
import {
  GetTaskCommentsParams,
  Comment,
  GetCommentParams,
  CommentNotFoundError
} from '../types';

import CommentRepository from './store/comment-repository';
import CommentUtil from './comment-util';

export default class CommentReader {

  public static async getComment(params: GetCommentParams): Promise<Comment> {
    const commentDb = await CommentRepository.findOne({
      _id: params.commentId,
      active: true,
    });
    if (!commentDb) {
      throw new CommentNotFoundError(params.commentId);
    }

    return CommentUtil.convertCommentDBToComment(commentDb);
  }

  public static async getCommentsForTask(params: GetTaskCommentsParams): Promise<Comment []> {

    const commentsDb = await CommentRepository
      .find({ task: params.taskId, active: true });

    return commentsDb.map((commentDb) => CommentUtil.convertCommentDBToComment(commentDb));
  }
}
