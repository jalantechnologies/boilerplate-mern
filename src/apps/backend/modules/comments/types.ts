export interface Comment {
    id: string;
    taskId: string;
    userId: string;
    text: string;
    createdAt: Date;
  }
  
  export interface GetAllCommentsParams {
    taskId: string;
  }
  
  export interface GetCommentParams {
    commentId: string;
  }
  
  export interface CreateCommentParams {
    taskId: string;
    userId: string;
    text: string;
  }
  
  export interface UpdateCommentParams {
    commentId: string;
    text: string;
  }
  
  export interface DeleteCommentParams {
    commentId: string;
  }
  
  export class CommentNotFoundError extends Error {
    constructor(commentId: string) {
      super(`Comment with ID ${commentId} not found`);
      this.name = 'CommentNotFoundError';
    }
  }
  