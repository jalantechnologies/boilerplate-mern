import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

// Define the Comment class
export class Comment {
  id: string;
  taskId: string;
  userId: string;
  comment: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    taskId: string,
    userId: string,
    comment: string,
    active: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.taskId = taskId;
    this.userId = userId;
    this.comment = comment;
    this.active = active;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

// Define the parameters for getting comments
export type GetCommentsParams = {
  taskId: string;
};

// Define the parameters for creating a comment
export type CreateCommentParams = {
  taskId: string;
  userId: string;
  comment: string;
};

// Define the parameters for editing a comment
export type EditCommentParams = {
  commentId: string;
  comment: string;
};

// Enum for comment error codes
export enum CommentErrorCode {
  NOT_FOUND = 'COMMENT_ERR_01',
}

// Custom error class for comment not found
export class CommentNotFoundError extends ApplicationError {
  code: CommentErrorCode;

  constructor(commentId: string) {
    super(`Comment with commentId ${commentId} not found.`);
    this.code = CommentErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}
