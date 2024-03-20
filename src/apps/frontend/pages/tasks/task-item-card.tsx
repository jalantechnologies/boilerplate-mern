import React, { PropsWithChildren } from 'react';

const TaskItemCard: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="relative mt-5 rounded-sm border border-stroke bg-white p-6 shadow-default">
    {children}
  </div>
);

export default TaskItemCard;
