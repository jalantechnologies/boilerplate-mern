import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { HeadingMedium, VerticalStackLayout } from '../../components';
import { useTaskContext } from '../../contexts';
import { AsyncError } from '../../types';

import TaskHeader from './task-header';
import TaskSection from './task-section';
import ShareTaskModal from './share-task-modal';

const Tasks: React.FC = () => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('');

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  const { deleteTask, getTasks, isGetTasksLoading, setTasksList, tasksList } =
    useTaskContext();

  useEffect(() => {
    getTasks().catch((error) => onError(error as AsyncError));
  }, []);

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId)
      .then(() => {
        setTasksList(tasksList.filter((task) => task.id !== taskId));
      })
      .catch((error) => onError(error as AsyncError));
  };

  const handleShareTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setIsShareModalOpen(true);
  };

  return (
    <div className="mx-auto h-screen max-w-screen-2xl overflow-y-auto p-4 md:p-6 2xl:p-10">
      <div className="mx-auto max-w-5xl">
        <VerticalStackLayout gap={7}>
          <HeadingMedium>TaskList</HeadingMedium>
          <TaskHeader />
          <TaskSection
            tasks={tasksList}
            isGetTasksLoading={isGetTasksLoading}
            handleDeleteTask={handleDeleteTask}
            handleShareTask={handleShareTask}
          />
        </VerticalStackLayout>
      </div>
      <ShareTaskModal
        isModalOpen={isShareModalOpen}
        setIsModalOpen={setIsShareModalOpen}
        taskId={selectedTaskId}
      />
    </div>
  );
};

export default Tasks;
