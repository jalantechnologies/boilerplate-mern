import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { HeadingMedium, VerticalStackLayout } from '../../components';
import { useTaskContext } from '../../contexts';
import { AsyncError } from '../../types';

import TaskHeader from './task-header';
import TaskSection from './task-section';

const Tasks: React.FC = () => {
  const [selectedTasks, setSelectedTasks] = useState([]);
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

  const handleTaskCheckBoxToggle = (taskId: string) : void => {
    setSelectedTasks(
      selectedTasks.includes(taskId)
        ? selectedTasks.filter((id) => id !== taskId)
        : [...selectedTasks, taskId],
    );
  };

  const resetSelectedTasks = (): void => {
    setSelectedTasks([]);
  }
  return (
    <div className="mx-auto max-w-5xl">
      <VerticalStackLayout gap={7}>
        <HeadingMedium>TaskList</HeadingMedium>
        <TaskHeader selectedTasks={selectedTasks} resetSelectedTasks={resetSelectedTasks}/>
        <TaskSection
          handleTaskCheckBoxToggle={handleTaskCheckBoxToggle}
          tasks={tasksList}
          isGetTasksLoading={isGetTasksLoading}
          handleDeleteTask={handleDeleteTask}
          selectedTasks={selectedTasks}
        />
      </VerticalStackLayout>
    </div>
  );
};

export default Tasks;
