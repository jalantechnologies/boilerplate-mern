import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

import { HeadingLarge, VerticalStackLayout } from '../../components';
import { useTaskContext } from '../../contexts';
import { AsyncError } from '../../types';

import TaskHeader from './task-header';
import TaskSection from './task-section';

const Tasks: React.FC = () => {
  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  const {
    deleteTask, getTasks, isGetTasksLoading, setTasksList, tasksList,
  } = useTaskContext();

  const fetchTasks = async () => {
    await getTasks();
  };

  useEffect(() => {
    fetchTasks()
      .then()
      .catch((error) => onError(error as AsyncError));
  }, []);

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId)
      .then(() => {
        setTasksList(tasksList.filter((task) => task.id !== taskId));
      })
      .catch((error) => onError(error as AsyncError));
  };

  return (
    <div className="h-screen overflow-y-auto p-5">
      <VerticalStackLayout gap={5}>
        <HeadingLarge>TaskList</HeadingLarge>
        <TaskHeader />
        <TaskSection
          tasks={tasksList}
          isGetTasksLoading={isGetTasksLoading}
          handleDeleteTask={handleDeleteTask}
        />
      </VerticalStackLayout>
    </div>
  );
};

export default Tasks;
