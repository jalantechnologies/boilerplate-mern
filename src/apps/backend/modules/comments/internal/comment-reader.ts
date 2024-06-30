import CommentRepository from './store/comment-repository';
import CommentUtil from './comment-util';
import { Comment, GetCommentsParams } from '../types';

export default class CommentReader {
  public static async getComments(params: GetCommentsParams): Promise<Comment[]> {
    const commentsDb = await CommentRepository.find({
      task: params.taskId,
      active: true,
    });

    return commentsDb.map((commentDb) => CommentUtil.convertCommentDBToComment(commentDb));
  }
}
