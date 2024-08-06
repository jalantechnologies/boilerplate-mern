import {
  CreateCommentParams,
  DeleteCommentParams,
  Comment,
  CommentNotFoundError,
  UpdateCommentParams,
} from '../types';

import CommentRepository from './store/comment-repository';
import CommentReader from './comment-reader';
import CommentUtil from './comment-util';

export default class CommentWriter {
  public static async createComment(
    params: CreateCommentParams,
  ): Promise<Comment> {
    const createdComment = await (
      await CommentRepository.create({
        task: params.taskId,
        account: params.accountId,
        comment: params.comment,
        active: true,
      })
    ).populate({
      path: 'account',
      model: 'accounts',
    });
    return CommentUtil.convertCommentDBToComment(createdComment);
  }

  public static async updateComment(
    params: UpdateCommentParams,
  ): Promise<Comment> {
    const comment = await CommentRepository.findOneAndUpdate(
      {
        task: params.taskId,
        account: params.accountId,
        _id: params.commentId,
        active: true,
      },
      {
        $set: {
          comment: params.comment,
        },
      },
      { new: true },
    ).populate({
      path: 'account',
      model: 'accounts',
    });

    if (!comment) {
      throw new CommentNotFoundError(params.commentId);
    }

    return CommentUtil.convertCommentDBToComment(comment);
  }

  public static async deleteComment(
    params: DeleteCommentParams,
  ): Promise<void> {
    const comment = await CommentReader.getCommentForAccount({
      accountId: params.accountId,
      commentId: params.commentId,
    });
    await CommentRepository.findOneAndUpdate(
      {
        _id: comment.id,
      },
      {
        $set: {
          active: false,
        },
      },
    );
  }
}