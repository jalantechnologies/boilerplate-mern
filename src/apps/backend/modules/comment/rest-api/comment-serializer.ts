import { Comment } from '../types';

export const serializeCommentAsJSON = (comment: Comment): unknown => ({
  id: comment.id,
  account: comment.account,
  taskId: comment.taskId,
  content: comment.content,
});
