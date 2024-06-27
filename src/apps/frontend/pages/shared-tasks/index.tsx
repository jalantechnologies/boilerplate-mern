import React, { useEffect } from 'react';
import { VerticalStackLayout, HeadingMedium } from '../../components';
import { useTaskContext } from '../../contexts';

const SharedTasks: React.FC = () => {
  const { sharedTasksList, getSharedTasks, isGetSharedTasksLoading } =
    useTaskContext();

  useEffect(() => {
    getSharedTasks();
  }, [getSharedTasks]);

  return (
    <div className="mx-auto h-screen max-w-screen-2xl overflow-y-auto p-4 md:p-6 2xl:p-10">
      <div className="mx-auto max-w-5xl">
        <VerticalStackLayout gap={7}>
          <HeadingMedium>Shared Tasks</HeadingMedium>
          {isGetSharedTasksLoading ? (
            <div>Loading...</div>
          ) : (
            sharedTasksList.map((sharedTask) => (
              <div
                key={sharedTask.id}
                className="p-4 mb-4 border rounded-lg shadow-sm bg-white"
              >
                <h3 className="text-lg font-semibold">
                  {sharedTask.task.title}
                </h3>
                <p>{sharedTask.task.description}</p>
                <p className="text-sm text-gray-500">
                  Shared by: {sharedTask.sharedBy}
                </p>
                <p className="text-sm text-gray-500">
                  Shared at: {new Date(sharedTask.sharedAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </VerticalStackLayout>
      </div>
    </div>
  );
};

export default SharedTasks;
