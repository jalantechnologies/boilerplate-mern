import { AccessToken, ApiError, ApiResponse } from '../types';
import { JsonObject } from '../types/common-types';
import { Comment } from '../types/comment';

import APIService from './api.service';

export default class CommentService extends APIService {
  addComment = async (
    taskId: string,
    comment: string,
  ): Promise<ApiResponse<Comment>> => {
    try {
      const userAccessToken = JSON.parse(
        localStorage.getItem('access-token'),
      ) as AccessToken;
      const response = await this.apiClient.post(
        `/tasks/${taskId}/comments`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        },
      );
      return new ApiResponse(
        new Comment(response.data as JsonObject),
        undefined,
      );
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  getComments = async (taskId: string): Promise<ApiResponse<Comment[]>> => {
    try {
      const userAccessToken = JSON.parse(
        localStorage.getItem('access-token'),
      ) as AccessToken;
      const response = await this.apiClient.get(`/tasks/${taskId}/comments`, {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });
      const comments: Comment[] = (response.data as JsonObject[]).map(
        (commentData) => new Comment(commentData),
      );
      return new ApiResponse(comments, undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  updateComment = async (
    commentId: string,
    taskId: string,
    comment: string,
  ): Promise<ApiResponse<Comment>> => {
    try {
      const userAccessToken = JSON.parse(
        localStorage.getItem('access-token'),
      ) as AccessToken;
      const response = await this.apiClient.put(
        `/tasks/${taskId}/comments/${commentId}`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        },
      );
      return new ApiResponse(
        new Comment(response.data as JsonObject),
        undefined,
      );
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  deleteComment = async (
    taskId: string,
    commentId: string,
  ): Promise<ApiResponse<void>> => {
    try {
      const userAccessToken = JSON.parse(
        localStorage.getItem('access-token'),
      ) as AccessToken;
      await this.apiClient.delete(`/tasks/${taskId}/comments/${commentId}`, {
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
}
