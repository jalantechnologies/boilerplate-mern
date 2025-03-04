import React, { useState } from 'react';

import { Comment } from '../../types/task';

interface TaskCommentsProps {
  comments: Comment[];
}
const TaskComments: React.FC<TaskCommentsProps> = ({ comments }) => {
  const [comment, setComment] = useState('');
  const handlePost = () => {
    console.log(comment);
    setComment('');
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && comment.length > 1) {
      handlePost();
    }
  };
  return (
    <div className="mt-4">
      <div className="w-full rounded-lg border-x-0 border-b-0 border-t border-stone-400"></div>
      <div className="mt-4">
        {comments &&
          comments.map((comm, idx) => (
            <div key={idx}>
              <div className="mt-2 flex items-center space-x-2">
                <div className="size-10 rounded-full">
                  <img
                    src={comm?.profilePicture}
                    alt={`${comm?.username} icon`}
                  />
                </div>
                <div className="font-semibold text-black-2">
                  {comm?.username}
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
          ))}
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <input
            value={comment}
            onKeyDown={(e) => handleKeyDown(e)}
            onChange={(e) => setComment(e.target.value)}
            className="w-full focus:outline-none"
            type="text"
            placeholder="Add a new comment..."
          />
        </div>
        <div
          onClick={comment.length > 1 ? handlePost : undefined}
          className={`cursor-pointer font-semibold ${comment.length > 1 ? 'text-primary' : 'text-bodydark1'}`}
        >
          Post
        </div>
      </div>
    </div>
  );
};
export default TaskComments;
