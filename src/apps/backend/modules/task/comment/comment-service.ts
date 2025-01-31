import Comment from '../internal/store/comment-db';
import { Types } from 'mongoose';
import { CommentDB } from '../types';

export default class CommentService {
  public static async createComment(taskId: Types.ObjectId, userId: Types.ObjectId, content: string): Promise<CommentDB> {
    const comment = new Comment({ taskId, userId, content });
    return comment.save();
  }

  public static async getCommentsByTaskId(taskId: Types.ObjectId): Promise<CommentDB[]> {
    return Comment.find({ taskId }).populate('userId', 'username').exec();
  }

  public static async updateComment(commentId: Types.ObjectId, content: string): Promise<CommentDB | null> {
    return Comment.findByIdAndUpdate(commentId, { content }, { new: true }).exec();
  }

  public static async deleteComment(commentId: Types.ObjectId): Promise<CommentDB | null> {
    return Comment.findByIdAndDelete(commentId).exec();
  }
}