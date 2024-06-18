
import {
  GetTaskCommentsParams,
  Comment,
  GetCommentParams,
  CommentNotFoundError
} from '../types';

import CommentRepository from './store/comment-repository';
import CommentUtil from './comment-util';
import TaskRepository from '../../task/internal/store/task-repository';
import { TaskNotFoundError } from '../../task';

export default class CommentReader {

  public static async getComment(params: GetCommentParams): Promise<Comment> {
    const commentDb = await CommentRepository.findOne({
      _id: params.commentId,
      active: true,
    });
    if (!commentDb) {
      throw new CommentNotFoundError(params.commentId);
    }

    return CommentUtil.convertCommentDBToComment(commentDb);
  }

  public static async getCommentsForTask(params: GetTaskCommentsParams): Promise<Comment []> {

    const taskDb = await TaskRepository.findOne({
      _id: params.taskId,
      active: true,
    });
    if (!taskDb) {
      throw new TaskNotFoundError(params.taskId);
    }

    const commentsDb = await CommentRepository
      .find({ task: params.taskId, active: true });

    return commentsDb.map((commentDb) => CommentUtil.convertCommentDBToComment(commentDb));
  }
}
