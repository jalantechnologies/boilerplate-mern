import { ApiError, ApiResponse } from '../types';
import { JsonObject } from '../types/common-types';
import { Task, Comment } from '../types/task';
import { getAccessTokenFromStorage } from '../utils/storage-util';

import APIService from './api.service';

export default class TaskService extends APIService {
  addTask = async (
    title: string,
    description: string
  ): Promise<ApiResponse<Task>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      const response = await this.apiClient.post(
        '/tasks',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        }
      );
      return new ApiResponse(new Task(response.data as JsonObject), undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject)
      );
    }
  };

  getTasks = async (): Promise<ApiResponse<Task[]>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      const response = await this.apiClient.get('/tasks', {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });
      const tasks: Task[] = (response.data as JsonObject[]).map(
        (taskData) => new Task(taskData)
      );
      return new ApiResponse(tasks, undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject)
      );
    }
  };

  updateTask = async (
    taskId: string,
    taskData: Task
  ): Promise<ApiResponse<Task>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      const response = await this.apiClient.patch(
        `/tasks/${taskId}`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        }
      );
      return new ApiResponse(new Task(response.data as JsonObject), undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject)
      );
    }
  };

  deleteTask = async (taskId: string): Promise<ApiResponse<void>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      await this.apiClient.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });
      return new ApiResponse(undefined, undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject)
      );
    }
  };

  addComment = async (
    taskId: string,
    content: string
  ): Promise<ApiResponse<Comment>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      const response = await this.apiClient.post(
        '/comments',
        { taskId, content },
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        }
      );
      return new ApiResponse(
        new Comment(response.data as JsonObject),
        undefined
      );
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject)
      );
    }
  };

  getCommentsByTaskId = async (
    taskId: string
  ): Promise<ApiResponse<Comment[]>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      const response = await this.apiClient.get(`/comments/${taskId}`, {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });

      const comments: Comment[] = (response.data as JsonObject[]).map(
        (commentData) => new Comment(commentData)
      );

      return new ApiResponse(comments, undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject)
      );
    }
  };

  updateComment = async (
    commentId: string,
    content: string
  ): Promise<ApiResponse<Comment>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      const response = await this.apiClient.patch(
        `/comments/${commentId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        }
      );
      return new ApiResponse(
        new Comment(response.data as JsonObject),
        undefined
      );
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject)
      );
    }
  };

  deleteComment = async (commentId: string): Promise<ApiResponse<void>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      await this.apiClient.delete(`/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });
      return new ApiResponse(undefined, undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject)
      );
    }
  };
}
