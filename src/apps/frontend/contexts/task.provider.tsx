import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import TaskService from '../services/task.service';
import { ApiResponse, AsyncError } from '../types';
import { Task, Comment } from '../types/task';

import useAsync from './async.hook';

type TaskContextType = {
  addComment: (taskId: string, content: string) => Promise<Comment>;
  addCommentError: AsyncError;
  addTask: (title: string, description: string) => Promise<Task>;
  addTaskError: AsyncError;
  comments: { [taskId: string]: Comment[] };
  deleteComment: (commentId: string) => Promise<void>;
  deleteCommentError: AsyncError;
  deleteTask: (taskId: string) => Promise<void>;
  deleteTaskError: AsyncError;
  getCommentsByTaskId: (taskId: string) => Promise<Comment[]>;
  getCommentsError: AsyncError;
  getTasks: () => Promise<Task[]>;
  getTasksError: AsyncError;
  isAddCommentLoading: boolean;
  isAddTaskLoading: boolean;
  isDeleteCommentLoading: boolean;
  isDeleteTaskLoading: boolean;
  isGetCommentsLoading: boolean;
  isGetTasksLoading: boolean;
  isUpdateCommentLoading: boolean;
  isUpdateTaskLoading: boolean;
  setTaskCommentsList: React.Dispatch<
    React.SetStateAction<{ [taskId: string]: Comment[] }>
  >;
  setTasksList: React.Dispatch<React.SetStateAction<Task[]>>;
  task: Task;
  tasks: Task[];
  tasksList: Task[];
  updateComment: (commentId: string, content: string) => Promise<Comment>;
  updateCommentError: AsyncError;
  updateTask: (taskId: string, taskData: Partial<Task>) => Promise<Task>;
  updateTaskError: AsyncError;
  updatedTask: Task;
};

const TaskContext = createContext<TaskContextType | null>(null);

const taskService = new TaskService();

export const useTaskContext = (): TaskContextType => useContext(TaskContext);

const addTaskFn = async (
  title: string,
  description: string
): Promise<ApiResponse<Task>> => taskService.addTask(title, description);

const updateTaskFn = async (
  taskId: string,
  taskData: Task
): Promise<ApiResponse<Task>> => taskService.updateTask(taskId, taskData);

const deleteTaskFn = async (taskId: string): Promise<ApiResponse<void>> =>
  taskService.deleteTask(taskId);

const updateCommentFn = async (
  commentId: string,
  content: string
): Promise<ApiResponse<Comment>> =>
  taskService.updateComment(commentId, content);

const deleteCommentFn = async (commentId: string): Promise<ApiResponse<void>> =>
  taskService.deleteComment(commentId);

export const TaskProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [taskCommentsList, setTaskCommentsList] = useState<{
    [taskId: string]: Comment[];
  }>({});

  const getTasksFn = async (): Promise<ApiResponse<Task[]>> => {
    const response = await taskService.getTasks();
    setTasksList(response.data);
    return response;
  };

  const getCommentsFn = async (
    taskId: string
  ): Promise<ApiResponse<Comment[]>> => {
    const response = await taskService.getCommentsByTaskId(taskId);
    setTaskCommentsList((prevComments) => ({
      ...prevComments,
      [taskId]: response.data,
    }));
    return response;
  };

  const addCommentFn = async (
    taskId: string,
    content: string
  ): Promise<ApiResponse<Comment>> => {
    const response = await taskService.addComment(taskId, content);
    setTaskCommentsList((prevComments) => ({
      ...prevComments,
      [taskId]: [...(prevComments[taskId] || []), response.data],
    }));
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
    asyncCallback: addComment,
    error: addCommentError,
    isLoading: isAddCommentLoading,
  } = useAsync(addCommentFn);

  const {
    asyncCallback: updateComment,
    error: updateCommentError,
    isLoading: isUpdateCommentLoading,
  } = useAsync(updateCommentFn);

  const {
    asyncCallback: deleteComment,
    error: deleteCommentError,
    isLoading: isDeleteCommentLoading,
  } = useAsync(deleteCommentFn);

  const {
    asyncCallback: getCommentsByTaskId,
    error: getCommentsError,
    isLoading: isGetCommentsLoading,
  } = useAsync(getCommentsFn);

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
        setTaskCommentsList,
        setTasksList,
        task,
        tasks,
        tasksList,
        updateTask,
        updateTaskError,
        updatedTask,
        addComment,
        addCommentError,
        isAddCommentLoading,
        comments: taskCommentsList,
        getCommentsByTaskId,
        deleteComment,
        deleteCommentError,
        isDeleteCommentLoading,
        updateComment,
        updateCommentError,
        isUpdateCommentLoading,
        isGetCommentsLoading,
        getCommentsError,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
