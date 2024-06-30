import { CreateCommentParams, EditCommentParams, Comment } from '../types';
import CommentRepository from './store/comment-repository';
import CommentUtil from './comment-util';
import { Types } from 'mongoose';

export default class CommentWriter {
  public static async createComment(params: CreateCommentParams): Promise<Comment> {
    const commentDb = await CommentRepository.create({
      task: new Types.ObjectId(params.taskId),
      user: new Types.ObjectId(params.userId),
      comment: params.comment,
      active: true,
    });
    return CommentUtil.convertCommentDBToComment(commentDb);
  }

  public static async editComment(params: EditCommentParams): Promise<Comment | null> {
    const commentDb = await CommentRepository.findByIdAndUpdate(
      params.commentId,
      { comment: params.comment },
      { new: true }
    );
    return commentDb ? CommentUtil.convertCommentDBToComment(commentDb) : null;
  }

  public static async deleteComment(commentId: string): Promise<void> {
    await CommentRepository.findByIdAndUpdate(commentId, { active: false });
  }

  public static async replyToComment(params: CreateCommentParams): Promise<Comment> {
    return this.createComment(params);
  }
}
