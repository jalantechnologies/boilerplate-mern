import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import TaskService from '../services/task.service';
import { ApiResponse, AsyncError } from '../types';
import { Task, User } from '../types/task';
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
  setTasksList: React.Dispatch<React.SetStateAction<Task[]>>;
  task: Task;
  tasks: Task[];
  tasksList: Task[];
  updateTask: (taskId: string, taskData: Partial<Task>) => Promise<Task>;
  updateTaskError: AsyncError;
  updatedTask: Task;
  getUsers: (page: number, search: string) => Promise<User[]>;
  getUsersError: AsyncError;
  isGetUsersLoading: boolean;
  users: User[];
  shareTask: (taskId: string, userIds: string[]) => Promise<void>;
  shareTaskError: AsyncError;
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

const getUsersFn = async (
  page: number,
  search: string,
): Promise<ApiResponse<User[]>> => taskService.getUsers(page, search);

const shareTaskFn = async (
  taskId: string,
  userIds: string[],
): Promise<ApiResponse<void>> => taskService.shareTask(taskId, userIds);

export const TaskProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);

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
    asyncCallback: getUsers,
    error: getUsersError,
    isLoading: isGetUsersLoading,
  } = useAsync(getUsersFn);

  const { asyncCallback: shareTask, error: shareTaskError } =
    useAsync(shareTaskFn);

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
        getUsers: async (page: number, search: string) => {
          const response = await getUsers(page, search);
          setUsers(response);
          return response;
        },
        getUsersError,
        isGetUsersLoading,
        users,
        shareTask: async (taskId: string, userIds: string[]) => {
          await shareTask(taskId, userIds);
        },
        shareTaskError,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
