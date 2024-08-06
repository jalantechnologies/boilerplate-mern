import React, {
    createContext,
    PropsWithChildren,
    useContext,
    useState,
  } from 'react';
  
  import CommentService from '../services/comment.service';
  import { ApiResponse, AsyncError } from '../types';
  import { Comment } from '../types/comment';
  
  import useAsync from './async.hook';
  
  type CommentContextType = {
    addComment: (taskId: string, comment: string) => Promise<Comment>;
    addCommentError: AsyncError;
    deleteComment: (taskId: string, commentId: string) => Promise<void>;
    deleteCommentError: AsyncError;
    getComments: (taskId: string) => Promise<Comment[]>;
    getCommentsError: AsyncError;
    isAddCommentLoading: boolean;
    isDeleteCommentLoading: boolean;
    isGetCommentsLoading: boolean;
    isUpdateCommentLoading: boolean;
    setCommentsList: React.Dispatch<React.SetStateAction<Comment[]>>;
    comment: Comment;
    comments: Comment[];
    commentsList: Comment[];
    updateComment: (
      commentId: string,
      taskId: string,
      comment: string,
    ) => Promise<Comment>;
    updateCommentError: AsyncError;
    updatedComment: Comment;
  };
  
  const CommentContext = createContext<CommentContextType | null>(null);
  
  const commentService = new CommentService();
  
  export const useCommentContext = (): CommentContextType =>
    useContext(CommentContext);
  
  const addCommentFn = async (
    taskId: string,
    comment: string,
  ): Promise<ApiResponse<Comment>> => {
    return commentService.addComment(taskId, comment);
  };
  
  const updateCommentFn = async (
    commentId: string,
    taskId: string,
    comment: string,
  ): Promise<ApiResponse<Comment>> => {
    return commentService.updateComment(commentId, taskId, comment);
  };
  
  const deleteCommentFn = async (
    taskId: string,
    commentId: string,
  ): Promise<ApiResponse<void>> => {
    return commentService.deleteComment(taskId, commentId);
  };
  
  export const CommentProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [commentsList, setCommentsList] = useState<Comment[]>([]);
  
    const getCommentsFn = async (
      taskId: string,
    ): Promise<ApiResponse<Comment[]>> => {
      const response = await commentService.getComments(taskId);
      setCommentsList(response.data);
      return response;
    };
  
    const {
      asyncCallback: getComments,
      error: getCommentsError,
      isLoading: isGetCommentsLoading,
      result: comments,
    } = useAsync(getCommentsFn);
  
    const {
      asyncCallback: addComment,
      error: addCommentError,
      isLoading: isAddCommentLoading,
      result: comment,
    } = useAsync(addCommentFn);
  
    const {
      asyncCallback: updateComment,
      error: updateCommentError,
      isLoading: isUpdateCommentLoading,
      result: updatedComment,
    } = useAsync(updateCommentFn);
  
    const {
      asyncCallback: deleteComment,
      error: deleteCommentError,
      isLoading: isDeleteCommentLoading,
    } = useAsync(deleteCommentFn);
  
    return (
      <CommentContext.Provider
        value={{
          addComment,
          addCommentError,
          deleteComment,
          deleteCommentError,
          getComments,
          getCommentsError,
          isAddCommentLoading,
          isDeleteCommentLoading,
          isGetCommentsLoading,
          isUpdateCommentLoading,
          setCommentsList,
          comment,
          comments,
          commentsList,
          updateComment,
          updateCommentError,
          updatedComment,
        }}
      >
        {children}
      </CommentContext.Provider>
    );
  };
