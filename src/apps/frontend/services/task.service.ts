import { AccessToken, ApiError, ApiResponse } from '../types';
import { JsonObject } from '../types/common-types';
import { Task } from '../types/task';

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
        '/tasks', { title, description },
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        },
      );
      return new ApiResponse(new Task(response.data as JsonObject), undefined);
    } catch (e) {
      return new ApiResponse(undefined, new ApiError(e.response.data as JsonObject));
    }
  };

  getTasks = async (): Promise<ApiResponse<Task[]>> => {
    const userAccessToken = JSON.parse(
      localStorage.getItem('access-token'),
    ) as AccessToken;
    return this.apiClient.get('/tasks', {
      headers: {
        Authorization: `Bearer ${userAccessToken.token}`,
      },
    });
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
        `/tasks/${taskId}`, taskData,
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        },
      );
      return new ApiResponse(new Task(response.data as JsonObject), undefined);
    } catch (e) {
      return new ApiResponse(undefined, new ApiError(e.response.data as JsonObject));
    }
  };

  deleteTask = async (taskId: string): Promise<ApiResponse<void>> => {
    const userAccessToken = JSON.parse(
      localStorage.getItem('access-token'),
    ) as AccessToken;
    return this.apiClient.delete(`/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.token}`,
      },
    });
  };
}
