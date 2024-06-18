import { Comment } from '../types';

export const serializeCommentAsJSON = (comment: Comment): unknown => ({
  id: comment.id,
  account: comment.account,
  comment: comment.comment,
  task: comment.task,
});
