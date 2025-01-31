import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import TaskService from '../services/task.service';
import CommentService from '../services/comment.service';
import { ApiResponse, AsyncError } from '../types';
import { Task } from '../types/task';
import { Comment } from '../types/comment';

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
  addComment: (taskId: string, content: string) => Promise<Comment>;
  isAddCommentLoading: boolean;
};

const TaskContext = createContext<TaskContextType | null>(null);

const taskService = new TaskService();
const commentService = new CommentService();

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

const addCommentFn = async (taskId: string, content: string): Promise<ApiResponse<Comment>> =>
  commentService.addComment(taskId, content);

export const TaskProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasksList, setTasksList] = useState<Task[]>([]);

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
    asyncCallback: addComment,
    isLoading: isAddCommentLoading,
  } = useAsync(addCommentFn);

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
        addComment,
        isAddCommentLoading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};