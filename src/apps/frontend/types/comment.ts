export interface Comment {
    id: string;
    taskId: string;
    userId: string;
    text: string;
    createdAt: string;
    updatedAt?: string;
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
  