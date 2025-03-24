import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import TaskService from '../services/task.service';
import { ApiResponse, AsyncError } from '../types';
import { Nullable } from '../types/common';
import { Task } from '../types/task';

import useAsync from './async.hook';

type TaskContextType = {
  addTask: (title: string, description: string) => Promise<Nullable<Task>>;
  addTaskError: Nullable<AsyncError>;
  deleteTask: (taskId: string) => Promise<Nullable<void>>;
  deleteTaskError: Nullable<AsyncError>;
  getTasks: () => Promise<Nullable<Task[]>>;
  getTasksError: Nullable<AsyncError>;
  isAddTaskLoading: boolean;
  isDeleteTaskLoading: boolean;
  isGetTasksLoading: boolean;
  isUpdateTaskLoading: boolean;
  setTasksList: React.Dispatch<React.SetStateAction<Task[]>>;
  task: Nullable<Task>;
  tasks: Nullable<Task[]>;
  tasksList: Task[];
  updateTask: (
    taskId: string,
    taskData: Partial<Task>
  ) => Promise<Nullable<Task>>;
  updateTaskError: Nullable<AsyncError>;
  updatedTask: Nullable<Task>;
};

const TaskContext = createContext<Nullable<TaskContextType>>(null);

const taskService = new TaskService();

export const useTaskContext = (): TaskContextType =>
  useContext(TaskContext) as TaskContextType;

const addTaskFn = async (
  title: string,
  description: string
): Promise<ApiResponse<Nullable<Task>>> =>
  taskService.addTask(title, description);

const updateTaskFn = async (
  taskId: string,
  taskData: Task
): Promise<ApiResponse<Nullable<Task>>> =>
  taskService.updateTask(taskId, taskData);

const deleteTaskFn = async (
  taskId: string
): Promise<ApiResponse<Nullable<void>>> => taskService.deleteTask(taskId);

export const TaskProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasksList, setTasksList] = useState<Task[]>([]);

  const getTasksFn = async (): Promise<ApiResponse<Nullable<Task[]>>> => {
    const response = await taskService.getTasks();
    setTasksList(response.data as Task[]);
    return response;
  };

  const {
    asyncCallback: getTasks,
    error: getTasksError,
    isLoading: isGetTasksLoading,
    result: tasks,
  } = useAsync(getTasksFn);

  const {
    asyncCallback: addTask,
    error: addTaskError,
    isLoading: isAddTaskLoading,
    result: task,
  } = useAsync(addTaskFn);

  const {
    asyncCallback: updateTask,
    error: updateTaskError,
    isLoading: isUpdateTaskLoading,
    result: updatedTask,
  } = useAsync(updateTaskFn);

  const {
    asyncCallback: deleteTask,
    error: deleteTaskError,
    isLoading: isDeleteTaskLoading,
  } = useAsync(deleteTaskFn);

  return (
    <TaskContext.Provider
      value={{
        addTask,
        addTaskError,
        deleteTask,
        deleteTaskError,
        getTasks,
        getTasksError,
        isAddTaskLoading,
        isDeleteTaskLoading,
        isGetTasksLoading,
        isUpdateTaskLoading,
        setTasksList,
        task,
        tasks,
        tasksList,
        updateTask,
        updateTaskError,
        updatedTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
