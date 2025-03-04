import { Comment, CreateCommentParams } from '../types';

import CommentUtil from './comment-util';
import CommentRepository from './store/comment-repository';

export default class CommentWriter {
  public static async createComment(
    params: CreateCommentParams
  ): Promise<Comment> {
    const createdComment = await CommentRepository.create({
      account: params.accountId,
      content: params.content,
      task: params.taskId,
    });
    return CommentUtil.convertCommentDBToComment(createdComment);
  }
}
