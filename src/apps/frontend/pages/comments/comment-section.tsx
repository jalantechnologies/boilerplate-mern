import React, { useState } from 'react';
import { Comment } from '../../types/comment';
import CommentModal from './comment-modal';
import { deleteComment } from '../../services/comment.services';
import { Task } from '../../types/task';

interface CommentSectionProps {
  comments: Comment[];
  taskOwnerId: string;
  currentUserId: string;
  task: Task;
}

const CommentSection: React.FC<CommentSectionProps> = ({ comments, taskOwnerId, currentUserId, task }) => {
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);

  const handleEditComment = (comment: Comment) => {
    setSelectedComment(comment);
    setCommentModalOpen(true);
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment({ commentId });
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="font-bold">Comments</h3>
      {comments.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        comments.map((comment) => {
          const isCommentCreator = comment.userId === currentUserId;
          const isTaskOwner = taskOwnerId === currentUserId;
          const canEditComment = isCommentCreator;
          const canDeleteComment = isCommentCreator || isTaskOwner;

          return (
            <div key={comment.id} className="flex justify-between border p-2 mt-2 rounded">
              <p>{comment.text}</p>
              <div className="flex space-x-2">
                {canEditComment && <button onClick={() => handleEditComment(comment)}>Edit</button>}
                {canDeleteComment && <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>}
              </div>
            </div>
          );
        })
      )}

      {/* Comment Modal */}
      <CommentModal
        isModalOpen={isCommentModalOpen}
        setIsModalOpen={setCommentModalOpen}
        commentId={selectedComment?.id}
        taskId={task.id}
        userId={currentUserId}
        initialText={selectedComment?.text}
      />
    </div>
  );
};

export default CommentSection;
