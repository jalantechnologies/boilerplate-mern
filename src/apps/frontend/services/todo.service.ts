import { ApiError, ApiResponse , Todo, AllTodos } from '../types';
import { JsonObject } from '../types/common-types';
import { getAccessTokenFromStorage } from '../utils/storage-util';

import APIService from './api.service';

export default class TaskService extends APIService {
  createTodo = async (
    title: string,
    description: string,
    type: string,
    dueDate: Date,
  ): Promise<ApiResponse<Todo>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      const response = await this.apiClient.post(
        '/todo',
        { title, description, type, dueDate },
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        },
      );
      return new ApiResponse(new Todo(response.data as JsonObject), undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  deleteTodo = async (todoId: string): Promise<ApiResponse<void>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      await this.apiClient.delete(`/todo/${todoId}`, {
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

  updateTodo = async (
    todoId: string,
    todoData: Todo,
  ): Promise<ApiResponse<Todo>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      const response = await this.apiClient.patch(`/todo/${todoId}`, todoData, {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });
      return new ApiResponse(new Todo(response.data as JsonObject), undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  getTodo = async (todoId: string): Promise<ApiResponse<Todo>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      const response = await this.apiClient.get(`/todo/${todoId}`, {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });
      return new ApiResponse(new Todo(response.data as JsonObject), undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  getTodos = async (): Promise<ApiResponse<AllTodos>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      const response = await this.apiClient.get('/todo', {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });

      const categorizedTodos = response.data as {
        overdue: JsonObject[];
        completed: JsonObject[];
        pending: JsonObject[];
      };

      return new ApiResponse(
        {
          overdue: categorizedTodos.overdue.map((todo) => new Todo(todo)),
          completed: categorizedTodos.completed.map((todo) => new Todo(todo)),
          pending: categorizedTodos.pending.map((todo) => new Todo(todo)),
        },
        undefined,
      );
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response?.data as JsonObject),
      );
    }
  };
}
