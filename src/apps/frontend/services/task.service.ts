import { AccessToken, ApiError, ApiResponse } from '../types';
import { JsonObject } from '../types/common-types';
import { Task, User } from '../types/task';

import APIService from './api.service';

export default class TaskService extends APIService {
  addTask = async (
    title: string,
    description: string,
  ): Promise<ApiResponse<Task>> => {
    try {
      const userAccessToken = JSON.parse(
        localStorage.getItem('access-token'),
      ) as AccessToken;
      const response = await this.apiClient.post(
        '/tasks',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        },
      );
      return new ApiResponse(new Task(response.data as JsonObject), undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  getTasks = async (): Promise<ApiResponse<Task[]>> => {
    try {
      const userAccessToken = JSON.parse(
        localStorage.getItem('access-token'),
      ) as AccessToken;
      const response = await this.apiClient.get('/tasks', {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });
      const tasks: Task[] = (response.data as JsonObject[]).map(
        (taskData) => new Task(taskData),
      );
      return new ApiResponse(tasks, undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  updateTask = async (
    taskId: string,
    taskData: Task,
  ): Promise<ApiResponse<Task>> => {
    try {
      const userAccessToken = JSON.parse(
        localStorage.getItem('access-token'),
      ) as AccessToken;
      const response = await this.apiClient.patch(
        `/tasks/${taskId}`,
        taskData,
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        },
      );
      return new ApiResponse(new Task(response.data as JsonObject), undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  deleteTask = async (taskId: string): Promise<ApiResponse<void>> => {
    try {
      const userAccessToken = JSON.parse(
        localStorage.getItem('access-token'),
      ) as AccessToken;
      await this.apiClient.delete(`/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });
      return new ApiResponse(undefined, undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  getUsers = async (
    page: number,
    search: string,
  ): Promise<ApiResponse<User[]>> => {
    try {
      const userAccessToken = JSON.parse(
        localStorage.getItem('access-token'),
      ) as AccessToken;
      const response = await this.apiClient.get(
        `/accounts/active-users?page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        },
      );
      const users: User[] = (response.data as JsonObject[]).map(
        (userData) => new User(userData),
      );
      return new ApiResponse(users, undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  shareTask = async (
    taskId: string,
    userIds: string[],
  ): Promise<ApiResponse<void>> => {
    try {
      const userAccessToken = JSON.parse(
        localStorage.getItem('access-token'),
      ) as AccessToken;
      await this.apiClient.post(
        `/tasks/${taskId}/share`,
        { userIds },
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        },
      );
      return new ApiResponse(undefined, undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };
}
