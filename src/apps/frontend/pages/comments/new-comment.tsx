import React, { useState } from 'react';
import { useCommentContext } from '../../contexts/comment.provider';
import { AsyncError } from '../../types';
import toast from 'react-hot-toast';

interface AddCommentProps {
  taskId: string;
}

const AddComment: React.FC<AddCommentProps> = ({ taskId }) => {
  const [comment, setComment] = useState('');
  const { addComment, setCommentsList, commentsList } = useCommentContext();

  const handleAddComment = () => {
    if (!comment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    addComment(taskId, comment)
      .then((newComment) => {
        setCommentsList([...commentsList, newComment]);
        setComment('');
        toast.success('Comment added successfully');
      })
      .catch((error: AsyncError) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="mt-4">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
        className="w-full p-2 border rounded mb-2"
      />
      <button
        onClick={handleAddComment}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Comment
      </button>
    </div>
  );
};

export default AddComment;
