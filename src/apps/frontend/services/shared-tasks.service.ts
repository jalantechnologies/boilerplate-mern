import { AccessToken, ApiResponse, ApiError } from '../types';
import APIService from './api.service';
// import { SharedTask } from '../types/shared-task';
import { Task } from '../types/task';

export default class SharedTaskService extends APIService {
  async shareTask(
    taskId: string,
    accountIds: string[],
  ): Promise<ApiResponse<void>> {
    const userAccessToken = JSON.parse(
      localStorage.getItem('access-token'),
    ) as AccessToken;
    try {
      await this.apiClient.post(
        `/tasks/${taskId}/share-task-requests`,
        { taskId, accountIds },
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        },
      );
      return new ApiResponse(undefined, undefined);
    } catch (e) {
      return new ApiResponse(undefined, new ApiError(e.response.data));
    }
  }

  async getSharedTasks(): Promise<ApiResponse<Task[]>> {
    const userAccessToken = JSON.parse(
      localStorage.getItem('access-token'),
    ) as AccessToken;
    const accountId = userAccessToken.accountId;
    try {
      const response = await this.apiClient.get(`/tasks/shared/${accountId}`, {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      }); 
      const sharedTasks: Task[] = response.data.map(
        (taskData: any) => new Task(taskData),
      );
      return new ApiResponse(sharedTasks, undefined);
    } catch (e) {
      return new ApiResponse(undefined, new ApiError(e.response.data));
    }
  }
}