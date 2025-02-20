import React, { createContext, useContext, useState } from 'react';
import { Comment } from '../types/comment';
import CommentService from '../services/comment.services';

interface CommentContextType {
  comments: Comment[];
  getComments: (taskId: string) => Promise<void>;
  createComment: (taskId: string, userId: string, text: string) => Promise<void>;
  updateComment: (commentId: string, text: string) => Promise<void>;
  deleteComment: (commentId: string) => Promise<void>;
}

const CommentContext = createContext<CommentContextType | undefined>(undefined);

export const CommentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  const getComments = async (taskId: string) => {
    const data = await CommentService.getComments(taskId);
    setComments(Array.isArray(data) ? data : []); // ✅ Ensure always an array
  };

  const createComment = async (taskId: string, userId: string, text: string) => {
    const newComment = await CommentService.createComment(taskId, userId, text);
    if (newComment && newComment.id) setComments([...comments, newComment]); // ✅ Prevent undefined issues
  };

  const updateComment = async (commentId: string, text: string) => {
    const updatedComment = await CommentService.updateComment(commentId, text);
    setComments(comments.map((comment) => (comment.id === commentId ? updatedComment : comment))); // ✅ Safe update
  };

  const deleteComment = async (commentId: string) => {
    await CommentService.deleteComment(commentId);
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  return (
    <CommentContext.Provider value={{ comments, getComments, createComment, updateComment, deleteComment }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  const context = useContext(CommentContext);
  if (!context) throw new Error('useCommentContext must be used within CommentProvider');
  return context;
};
