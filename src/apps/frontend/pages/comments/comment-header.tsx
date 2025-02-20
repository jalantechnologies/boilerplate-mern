import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { Button, HeadingLarge } from '../../components';
import { AsyncError } from '../../types';
import { ButtonSize } from '../../types/button';

import CommentModal from './comment-modal';
import { useCommentContext } from '../../contexts/comments.provider';
import { useParams } from 'react-router-dom';

const CommentHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { createComment } = useCommentContext();
  const { taskId } = useParams<{ taskId: string }>();

  const onSuccess = () => {
    toast.success('Comment has been added successfully');
    setIsModalOpen(false);
  };

  const handleAddComment = async (text: string) => {
    try {
      if (taskId) {
        await createComment(taskId, 'currentUserId', text);
        onSuccess();
      }
    } catch (error) {
      toast.error((error as AsyncError).message);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white p-3 shadow-default">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="pl-2">
          <HeadingLarge>Comments</HeadingLarge>
        </div>
        <div>
          <Button onClick={() => setIsModalOpen(!isModalOpen)} size={ButtonSize.COMPACT}>
            Add Comment
          </Button>
        </div>
        <CommentModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleSubmit={handleAddComment} />
      </div>
    </div>
  );
};

export default CommentHeader;
