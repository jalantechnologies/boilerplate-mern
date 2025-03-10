import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Button, MenuItem } from '../../components';
import { useTaskContext } from '../../contexts';
import { AsyncError } from '../../types';
import { ButtonKind, ButtonSize } from '../../types/button';
import { Comment } from '../../types/task';

import useTaskForm from './tasks-form.hook';

interface TaskCommentsProps {
  taskId: string;
}

const TaskComments: React.FC<TaskCommentsProps> = ({ taskId }) => {
  const [editCommnet, setEditComment] = useState(false);

  const onSuccess = () => {
    if (editCommnet) {
      setEditComment(false);
    }
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };
  const {
    addCommentFormik,
    isAddCommentLoading,
    setFormikFieldValue,
    updateCommentFormik,
  } = useTaskForm({
    onSuccess,
    onError,
    commentInitialValues: { content: '', taskId },
  });

  const {
    comments,
    getCommentsByTaskId,
    deleteComment,
    setTaskCommentsList,
    isDeleteCommentLoading,
    isUpdateCommentLoading,
  } = useTaskContext();

  useEffect(() => {
    getCommentsByTaskId(taskId).catch((error) => onError(error as AsyncError));
  }, [taskId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && addCommentFormik.values.content.length > 1) {
      e.preventDefault();
      // addCommentFormik.setFieldValue('taskId', taskId);
      addCommentFormik.handleSubmit();
    }
  };

  const handleDeleteComment = (CommentId: string) => {
    setEditComment(false);
    deleteComment(CommentId)
      .then(() => {
        const updatedComments = { ...comments };
        updatedComments[taskId] = comments[taskId].filter(
          (comm) => comm.id !== CommentId
        );
        setTaskCommentsList(updatedComments);
      })
      .catch((error) => onError(error as AsyncError));
  };

  const handleEditComment = (comment: Comment) => {
    setEditComment(!editCommnet);
    setFormikFieldValue(updateCommentFormik, 'commentId', comment.id);
    setFormikFieldValue(updateCommentFormik, 'content', comment.content);
    setFormikFieldValue(updateCommentFormik, 'taskId', comment.taskId);
  };

  const postButtonLabel = () => {
    if (editCommnet) {
      return isUpdateCommentLoading ? 'Updating...' : 'Update';
    }
    return isAddCommentLoading ? 'Posting...' : 'Post';
  };

  return (
    <div className="mt-4">
      <div className="w-full rounded-lg border-x-0 border-b-0 border-t border-stone-400"></div>
      <div className="mt-4">
        {comments[taskId] &&
          comments[taskId].map((comm, idx) => (
            <div
              key={comm.id}
              className="relative flex items-center justify-between space-x-2"
            >
              <div>
                <div className="mt-2 flex items-center space-x-2">
                  <div className="size-10 rounded-full">
                    <img
                      src={`https://ui-avatars.com/api/?name=${comm.account.firstName}`}
                      alt={`user-${idx} icon`}
                      className="rounded-full"
                    />
                  </div>
                  <div className="font-semibold text-black-2">
                    {comm.account.firstName}
                  </div>
                  <div className="text-xs">
                    {new Date(comm.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                <div className="ml-12 text-black">{comm?.content}</div>
              </div>

              <div className="absolute right-4 top-4">
                <MenuItem>
                  <Button
                    disabled={isUpdateCommentLoading}
                    onClick={() => handleEditComment(comm)}
                    kind={ButtonKind.SECONDARY}
                    size={ButtonSize.DEFAULT}
                    startEnhancer={
                      <img src="assets/svg/edit-icon.svg" alt="Edit task" />
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    disabled={isDeleteCommentLoading}
                    onClick={() => handleDeleteComment(comm.id)}
                    kind={ButtonKind.SECONDARY}
                    size={ButtonSize.DEFAULT}
                    startEnhancer={
                      <img src="assets/svg/delete-icon.svg" alt="Delete task" />
                    }
                  >
                    Delete
                  </Button>
                </MenuItem>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-4 flex justify-between">
        <form
          onSubmit={
            editCommnet
              ? updateCommentFormik.handleSubmit
              : addCommentFormik.handleSubmit
          }
          className="flex w-full justify-between"
        >
          <input
            name="content"
            value={
              editCommnet
                ? updateCommentFormik.values.content
                : addCommentFormik.values.content
            }
            onKeyDown={handleKeyDown}
            onChange={
              editCommnet
                ? updateCommentFormik.handleChange
                : addCommentFormik.handleChange
            }
            className="w-full focus:outline-none"
            type="text"
            placeholder="Add a new comment..."
          />
          <button
            type="submit"
            disabled={
              (!editCommnet &&
                (isAddCommentLoading ||
                  addCommentFormik.values.content.length < 2)) ||
              (editCommnet &&
                (updateCommentFormik.values.content.length < 2 ||
                  isUpdateCommentLoading))
            }
            className={`cursor-pointer font-semibold ${
              (!editCommnet && addCommentFormik.values.content.length > 1) ||
              (editCommnet && updateCommentFormik.values.content.length > 1)
                ? 'text-primary'
                : 'text-bodydark1'
            }`}
          >
            {postButtonLabel()}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskComments;
