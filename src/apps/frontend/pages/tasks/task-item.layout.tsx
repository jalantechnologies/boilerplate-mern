import React, { PropsWithChildren } from 'react';

const TaskItemLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default sm:flex-row sm:items-center sm:justify-between">
    {children}
  </div>
);

export default TaskItemLayout;
