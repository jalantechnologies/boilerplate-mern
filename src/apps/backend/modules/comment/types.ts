import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export class Comment {
  id: string;
  account: string;
  comment: string;
  task: string;
}

export type GetCommentParams = {
  commentId: string;
};

export type GetTaskCommentsParams = {
  taskId: string;
};

export type CreateCommentParams = {
  accountId: string;
  comment: string;
  taskId: string;
};

export type UpdateCommentParams = {
  comment: string;
  commentId: string;
};

export type DeleteCommentParams = {
  commentId: string;
};

export type PaginationParams = {
  page: number;
  size: number;
};

export enum CommentErrorCode {
  NOT_FOUND = 'COMMENT_ERR_01',
}

export class CommentNotFoundError extends ApplicationError {
  code: CommentErrorCode;

  constructor(commentId: string) {
    super(`Comment with commentId ${commentId} not found.`);
    this.code = CommentErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}
