import React from 'react';
import { Comment } from '../../types/comment';
import { useCommentContext } from '../../contexts/comments.provider';

interface CommentSectionProps {
  comments: Comment[] | null | undefined; // ✅ Allow null/undefined to avoid crashes
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  const { deleteComment } = useCommentContext();

  if (!Array.isArray(comments)) {
    return <p>No comments available.</p>; // ✅ Prevent `map` error
  }

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="font-bold">Comments</h3>
      {comments.length === 0 ? <p>No comments yet.</p> : comments.map((comment) => (
        <div key={comment.id} className="flex justify-between border p-2 mt-2 rounded">
          <p>{comment.text}</p>
          <button onClick={() => deleteComment(comment.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
