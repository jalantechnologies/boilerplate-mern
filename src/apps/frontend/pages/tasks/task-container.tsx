import React, { useEffect } from 'react';

import VerticalStackLayout from '../../components/layouts/vertical-stack-layout';
import HeadingLarge from '../../components/typography/heading-large';
import { useTaskContext } from '../../contexts';
import { AsyncError } from '../../types';

import TaskHeader from './task-header';
import TaskSection from './task-section';

interface TaskContainerProps {
  onError: (error: AsyncError) => void;
}

const TaskContainer: React.FC<TaskContainerProps> = ({ onError }) => {
  const {
    getTasks, tasksList, deleteTask, setTasksList, isGetTasksLoading,
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
    <VerticalStackLayout gap={5}>
      <HeadingLarge>TaskList</HeadingLarge>
      <TaskHeader />
      <TaskSection
        tasks={tasksList}
        isGetTasksLoading={isGetTasksLoading}
        handleDeleteTask={handleDeleteTask}
      />
    </VerticalStackLayout>
  );
};

export default TaskContainer;
