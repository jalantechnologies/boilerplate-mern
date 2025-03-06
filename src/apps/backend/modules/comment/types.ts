import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export class Comment {
  id: string;
  account: string;
  taskId: string;
  content: string;
}

export type CreateCommentParams = {
  accountId: string;
  content: string;
  taskId: string;
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
