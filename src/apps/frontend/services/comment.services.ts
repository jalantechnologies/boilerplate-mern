import { CreateCommentParams, UpdateCommentParams, DeleteCommentParams, Comment } from '../types/comment';

const API_BASE = '/api/comments';

export const createComment = async (params: CreateCommentParams): Promise<Comment> => {
  const response = await fetch(`${API_BASE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) throw new Error('Failed to create comment');
  return response.json();
};

export const updateComment = async (params: UpdateCommentParams): Promise<Comment> => {
  const response = await fetch(`${API_BASE}/${params.commentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: params.text }),
  });

  if (!response.ok) throw new Error('Failed to update comment');
  return response.json();
};

export const deleteComment = async (params: DeleteCommentParams): Promise<void> => {
  const response = await fetch(`${API_BASE}/${params.commentId}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete comment');
};
