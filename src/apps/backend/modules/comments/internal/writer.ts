import { CommentDB } from './store/db';
import { Model } from 'mongoose';

export default class CommentWriter {
  private commentModel: Model<CommentDB>;

  constructor(commentModel: Model<CommentDB>) {
    this.commentModel = commentModel;
  }

  public async createComment(taskId: string, userId: string, content: string) {
    return this.commentModel.create({ taskId, userId, content });
  }

  public async updateComment(commentId: string, content: string) {
    return this.commentModel.findByIdAndUpdate(commentId, { content }, { new: true });
  }

  public async deleteComment(commentId: string) {
    return this.commentModel.findByIdAndDelete(commentId);
  }
}
