import {
  Comment,
  CreateCommentParams,
  DeleteCommentParams,
  UpdateCommentParams,
} from '../types';

import CommentReader from './comment-reader';
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

  public static async updateComment(
    params: UpdateCommentParams
  ): Promise<Comment> {
    await CommentReader.getComment(params);
    const updatedComment = await CommentRepository.findOneAndUpdate(
      {
        _id: params.commentId,
      },
      {
        $set: {
          content: params.content,
        },
      },
      { new: true }
    );
    return CommentUtil.convertCommentDBToComment(updatedComment);
  }

  public static async deleteComment(
    params: DeleteCommentParams
  ): Promise<Comment> {
    await CommentReader.getComment(params);
    const deletedComment = await CommentRepository.findByIdAndDelete({
      _id: params.commentId,
    });
    return CommentUtil.convertCommentDBToComment(deletedComment);
  }
}
