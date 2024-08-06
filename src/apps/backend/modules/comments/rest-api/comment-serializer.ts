import { Comment } from '../types';

export const serializeCommentAsJSON = (comment: Comment): unknown => ({
  id: comment.id,
  task: comment.task,
  account:
    typeof comment.account === 'string'
      ? { id: comment.account }
      : {
          id: comment.account.id,
          firstName: comment.account.firstName,
          lastName: comment.account.lastName,
          username: comment.account.username,
        },
  comment: comment.comment,
  createdAt: comment.createdAt,
  updatedAt: comment.updatedAt,
});