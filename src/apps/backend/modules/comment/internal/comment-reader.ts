import {
  Comment,
  CommentNotFoundError,
  GetCommentParams,
  GetCommentsParams,
} from '../types';

import CommentUtil from './comment-util';
import CommentRepository from './store/comment-repository';

export default class CommentReader {
  public static async getCommentsForTask(
    params: GetCommentsParams
  ): Promise<Comment[]> {
    const commentsDb = await CommentRepository.find({
      task: params.taskId,
    }).populate('account');

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
}
