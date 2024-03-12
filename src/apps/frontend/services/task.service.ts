import { AccessToken, ApiResponse } from '../types';
import { Task } from '../types/task';

import APIService from './api.service';

export default class TaskService extends APIService {
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
    taskData: Partial<Task>,
  ): Promise<ApiResponse<Task>> => {
    const userAccessToken = JSON.parse(
      localStorage.getItem('access-token'),
    ) as AccessToken;
    return this.apiClient.put(`/tasks/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${userAccessToken.token}`,
      },
    });
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
