import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

import { HeadingMedium, VerticalStackLayout } from '../../components';
import { useCommentContext } from '../../contexts/comments.provider';
import { AsyncError } from '../../types';
import { useParams } from 'react-router-dom';

import CommentHeader from './comment-header';
import CommentSection from './comment-section';

const Comments: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const { getComments, comments } = useCommentContext();

  useEffect(() => {
    if (taskId) {
      getComments(taskId).catch((error) => toast.error((error as AsyncError).message));
    }
  }, [taskId]);

  return (
    <div className="mx-auto max-w-5xl">
      <VerticalStackLayout gap={7}>
        <HeadingMedium>Comments</HeadingMedium>
        <CommentHeader />
        <CommentSection comments={comments} />
      </VerticalStackLayout>
    </div>
  );
};

export default Comments;
