import { Comment } from '../types';

export const serializeCommentAsJSON = (comment: Comment): unknown => ({
  account: comment.account,
  content: comment.content,
  id: comment.id,
  taskId: comment.taskId,
});
