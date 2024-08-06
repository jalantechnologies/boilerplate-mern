import { GetCommentParams, Comment, CommentNotFoundError } from '../types';
import CommentRepository from './store/comment-repository';
import CommentUtil from './comment-util';

export default class CommentReader {
  public static async getCommentForAccount(
    params: GetCommentParams,
  ): Promise<Comment> {
    const commentDb = await CommentRepository.findOne({
      _id: params.commentId,
      account: params.accountId,
      active: true,
    });

    if (!commentDb) {
      throw new CommentNotFoundError(params.commentId);
    }

    return CommentUtil.convertCommentDBToComment(commentDb);
  }

  public static async getCommentsForTask(taskId: string): Promise<Comment[]> {
    const commentsDb = await CommentRepository.find({
      task: taskId,
      active: true,
    })
      .populate({
        path: 'account',
        model: 'accounts',
      })
      .exec();

    return commentsDb.map((commentDb) =>
      CommentUtil.convertCommentDBToComment(commentDb),
    );
  }
}
 