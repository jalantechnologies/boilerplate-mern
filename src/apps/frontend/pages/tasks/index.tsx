import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

import { HeadingMedium, VerticalStackLayout } from '../../components';
import { useTaskContext } from '../../contexts';
import { AsyncError } from '../../types';

import TaskHeader from './task-header';
import TaskSection from './task-section';

const Tasks: React.FC = () => {
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

  return (
    <div className="mx-auto max-w-5xl">
      <VerticalStackLayout gap={7}>
        <HeadingMedium>TaskList</HeadingMedium>
        <TaskHeader onError={onError} />
        <TaskSection
          tasks={tasksList}
          isGetTasksLoading={isGetTasksLoading}
          handleDeleteTask={handleDeleteTask}
          onError={onError}
        />
      </VerticalStackLayout>
    </div>
  );
};

export default Tasks;
