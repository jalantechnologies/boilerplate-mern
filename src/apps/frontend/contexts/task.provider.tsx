import React, { createContext, PropsWithChildren, useContext } from 'react';

import TaskService from '../services/task.service';
import { ApiResponse, AsyncError } from '../types';
import { Task } from '../types/task';

import useAsync from './async.hook';

type TaskContextType = {
  deleteTask: (taskId: string) => Promise<void>;
  getTasks: () => Promise<Task[]>;
  isTaskLoading: boolean;
  taskError: AsyncError;
  tasks: Task[];
  updateTask: (taskId: string, taskData: Partial<Task>) => Promise<Task>;
};

const TaskContext = createContext<TaskContextType | null>(null);

const taskService = new TaskService();

export const useTaskContext = (): TaskContextType => useContext(TaskContext);

const getTasksFn = async (): Promise<ApiResponse<Task[]>> => taskService.getTasks();

const updateTaskFn = async (
  taskId: string,
  taskData: Partial<Task>,
): Promise<ApiResponse<Task>> => taskService.updateTask(taskId, taskData);

const deleteTaskFn = async (taskId: string):
Promise<ApiResponse<void>> => taskService.deleteTask(taskId);

export const TaskProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    asyncCallback: getTasks,
    error: taskError,
    isLoading: isTaskLoading,
    result: tasks,
  } = useAsync(getTasksFn);

  const { asyncCallback: updateTask } = useAsync(updateTaskFn);

  const { asyncCallback: deleteTask } = useAsync(deleteTaskFn);

  return (
    <TaskContext.Provider
      value={{
        deleteTask,
        getTasks,
        isTaskLoading,
        tasks,
        taskError,
        updateTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
