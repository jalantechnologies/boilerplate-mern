import { CommentDB } from './store/db';
import { Comment } from '../types';
import CommentUtil from './util';
import { Model } from 'mongoose';

export default class CommentReader {
  private commentModel: Model<CommentDB>;

  constructor(commentModel: Model<CommentDB>) {
    this.commentModel = commentModel;
  }

  public async getCommentsByTask(taskId: string): Promise<Comment[]> {
    const comments = await this.commentModel.find({ taskId });
    return comments.map(CommentUtil.convertCommentDBToComment);
  }

  public async getCommentById(commentId: string): Promise<Comment | null> {
    const commentDb = await this.commentModel.findById(commentId);
    return commentDb ? CommentUtil.convertCommentDBToComment(commentDb) : null;
  }
}
