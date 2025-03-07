import React from 'react';
import toast from 'react-hot-toast';

import { Comment } from '../../types/task';

import useTaskForm from './tasks-form.hook';

interface TaskCommentsProps {
  comments: Comment[];
  taskId: string;
}

const TaskComments: React.FC<TaskCommentsProps> = ({ comments, taskId }) => {
  const onSuccess = () => {
    toast.success('Comment has been added successfully');
  };

  const onError = () => {
    toast.error('Comment cannot be added');
  };
  const { addCommentFormik, isAddCommentLoading } = useTaskForm({
    onSuccess,
    onError,
    commentInitialValues: { taskId, content: '' },
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && addCommentFormik.values.content.length > 1) {
      e.preventDefault();
      // addCommentFormik.setFieldValue('taskId', taskId);
      addCommentFormik.handleSubmit();
    }
  };

  return (
    <div className="mt-4">
      <div className="w-full rounded-lg border-x-0 border-b-0 border-t border-stone-400"></div>
      <div className="mt-4">
        {comments &&
          comments.map((comm, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between space-x-2"
            >
              <div>
                <div className="mt-2 flex items-center space-x-2">
                  <div className="size-10 rounded-full">
                    <img src="/assets/img/user.png" alt={`user-${idx} icon`} />
                  </div>
                  <div className="font-semibold text-black-2">user-{idx}</div>
                  <div className="text-xs">
                    {new Date(comm.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
                <div className="ml-12 text-black">{comm?.content}</div>
              </div>
              <img src="/assets/svg/edit.svg" alt="" className="size-4" />
            </div>
          ))}
      </div>
      <div className="mt-4 flex justify-between">
        <form
          onSubmit={addCommentFormik.handleSubmit}
          className="flex w-full justify-between"
        >
          <input
            name="content"
            value={addCommentFormik.values.content}
            onKeyDown={handleKeyDown}
            onChange={addCommentFormik.handleChange}
            className="w-full focus:outline-none"
            type="text"
            placeholder="Add a new comment..."
          />
          <button
            type="submit"
            disabled={
              isAddCommentLoading || addCommentFormik.values.content.length < 2
            }
            className={`cursor-pointer font-semibold ${
              addCommentFormik.values.content.length > 1
                ? 'text-primary'
                : 'text-bodydark1'
            }`}
          >
            {isAddCommentLoading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskComments;
