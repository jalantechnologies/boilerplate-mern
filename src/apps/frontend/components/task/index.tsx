import React, { useEffect } from 'react';

import { useTaskContext } from '../../contexts';
import { AsyncError } from '../../types';
import VerticalStackLayout from '../layouts/vertical-stack-layout';
import HeadingLarge from '../typography/heading-large';

import TaskBlockSection from './task-block-section';
import TaskHeader from './task-header';

interface TaskContainerProps {
  onError: (error: AsyncError) => void;
}

const TaskContainer: React.FC<TaskContainerProps> = ({ onError }) => {
  const {
    getTasks, tasksList, deleteTask, setTasksList,
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
      <TaskBlockSection tasks={tasksList} handleDeleteTask={handleDeleteTask} />
    </VerticalStackLayout>
  );
};

export default TaskContainer;
