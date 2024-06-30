import { AccessToken, ApiError, ApiResponse } from '../types';
import { JsonObject } from '../types/common-types';
import { Task} from '../types/task';
import { SharedTask } from '../types/shared-task';
import { Account } from '../types';

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

  shareTask = async (taskId: string, accountId: string): Promise<ApiResponse<void>> => {
    try {
      const userAccessToken = JSON.parse(localStorage.getItem('access-token')) as AccessToken;
      const response = await this.apiClient.post(`/tasks/share`, { accountId,taskId }, {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });
      console.log(response);
      console.log("task service taskId", taskId);
      return new ApiResponse(undefined, undefined);
    } catch (e) {
      console.error("Error sharing task:", e);
      return new ApiResponse(undefined, new ApiError(e.response?.data as JsonObject));
    }
  };

  getAccounts = async (
    page: number,
    size: number,
    search?: string,
  ): Promise<ApiResponse<Account[]>> => {
    try {
      const userAccessToken = JSON.parse(localStorage.getItem('access-token')) as AccessToken;
      const response = await this.apiClient.get(
        `/accounts?page=${page}&size=${size}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        },
      );
      const accounts: Account[] = (response.data as JsonObject[]).map(
        (accountData) => new Account(accountData),
      );
      return new ApiResponse(accounts, undefined);
    } catch (e) {
      console.error("Error fetching accounts:", e);
      return new ApiResponse(
        undefined,
        new ApiError(e.response?.data as JsonObject),
      );
    }
  };

  getSharedTasks = async (accountId: string): Promise<ApiResponse<SharedTask[]>> => {
    try {
      const userAccessToken = JSON.parse(localStorage.getItem('access-token')) as AccessToken;
      const response = await this.apiClient.get(`/tasks/shared-tasks/${accountId}`, {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });
      const sharedTasks: SharedTask[] = (response.data as JsonObject[]).map(
        (sharedTaskData) => new SharedTask(sharedTaskData),
      );
      return new ApiResponse(sharedTasks, undefined);
    } catch (e) {
      console.error("Error fetching shared tasks:", e);
      return new ApiResponse(
        undefined,
        new ApiError(e.response?.data as JsonObject),
      );
    }
  };
  
}
