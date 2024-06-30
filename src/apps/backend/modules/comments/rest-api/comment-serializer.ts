import { Comment } from '../types';

export const serializeCommentAsJSON = (comment: Comment): object => {
  return {
    id: comment.id,
    taskId: comment.taskId,
    userId: comment.userId,
    comment: comment.comment,
    active: comment.active,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  };
};
