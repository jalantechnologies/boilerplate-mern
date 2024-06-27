import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import TaskService from '../services/task.service';
import { ApiResponse, AsyncError } from '../types';
import { Task, Account, SharedTask } from '../types/task';

import useAsync from './async.hook';

type TaskContextType = {
  addTask: (title: string, description: string) => Promise<Task>;
  addTaskError: AsyncError;
  deleteTask: (taskId: string) => Promise<void>;
  deleteTaskError: AsyncError;
  getTasks: () => Promise<Task[]>;
  getTasksError: AsyncError;
  isAddTaskLoading: boolean;
  isDeleteTaskLoading: boolean;
  isGetTasksLoading: boolean;
  isUpdateTaskLoading: boolean;
  isGetAccountsLoading: boolean;
  isShareTaskLoading: boolean;
  isGetSharedTasksLoading: boolean;
  setTasksList: React.Dispatch<React.SetStateAction<Task[]>>;
  setAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  setSharedTasksList: React.Dispatch<React.SetStateAction<SharedTask[]>>;
  task: Task;
  tasks: Task[];
  tasksList: Task[];
  accounts: Account[];
  sharedTasksList: SharedTask[];
  updateTask: (taskId: string, taskData: Partial<Task>) => Promise<Task>;
  updateTaskError: AsyncError;
  shareTask: (taskId: string, accountId: string) => Promise<void>;
  shareTaskError: AsyncError;
  getAccounts: (
    page: number,
    size: number,
    search?: string,
  ) => Promise<Account[]>;
  getSharedTasks: () => Promise<SharedTask[]>;
  updatedTask: Task;
};

const TaskContext = createContext<TaskContextType | null>(null);

const taskService = new TaskService();

export const useTaskContext = (): TaskContextType => useContext(TaskContext);

const addTaskFn = async (
  title: string,
  description: string,
): Promise<ApiResponse<Task>> => taskService.addTask(title, description);

const updateTaskFn = async (
  taskId: string,
  taskData: Task,
): Promise<ApiResponse<Task>> => taskService.updateTask(taskId, taskData);

const deleteTaskFn = async (taskId: string): Promise<ApiResponse<void>> =>
  taskService.deleteTask(taskId);

const shareTaskFn = async (
  taskId: string,
  accountId: string,
): Promise<ApiResponse<void>> => taskService.shareTask(taskId, accountId);

const getAccountsFn = async (
  page: number,
  size: number,
  search?: string,
): Promise<ApiResponse<Account[]>> =>
  taskService.getAccounts(page, size, search);

const getSharedTasksFn = async (): Promise<ApiResponse<SharedTask[]>> =>
  taskService.getSharedTasks();

export const TaskProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [sharedTasksList, setSharedTasksList] = useState<SharedTask[]>([]);

  const getTasksFn = async (): Promise<ApiResponse<Task[]>> => {
    const response = await taskService.getTasks();
    setTasksList(response.data);
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

  const {
    asyncCallback: shareTask,
    error: shareTaskError,
    isLoading: isShareTaskLoading,
  } = useAsync(shareTaskFn);

  const { asyncCallback: getAccounts, isLoading: isGetAccountsLoading } =
    useAsync(getAccountsFn);

  const { asyncCallback: getSharedTasks, isLoading: isGetSharedTasksLoading } =
    useAsync(getSharedTasksFn);

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
        isGetAccountsLoading,
        isShareTaskLoading,
        isGetSharedTasksLoading,
        setTasksList,
        setAccounts,
        setSharedTasksList,
        task,
        tasks,
        tasksList,
        accounts,
        sharedTasksList,
        updateTask,
        updateTaskError,
        shareTask,
        shareTaskError,
        getAccounts,
        getSharedTasks,
        updatedTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
