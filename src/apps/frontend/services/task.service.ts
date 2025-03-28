import APIService from 'frontend/services/api.service';
import { ApiError, ApiResponse } from 'frontend/types';
import { JsonObject } from 'frontend/types/common-types';
import { Task } from 'frontend/types/task';
import { getAccessTokenFromStorage } from 'frontend/utils/storage-util';

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
}
