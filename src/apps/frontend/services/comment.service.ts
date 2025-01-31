import { ApiError, ApiResponse } from '../types';
import { JsonObject } from '../types/common-types';
import { Comment } from '../types/comment';
import { getAccessTokenFromStorage } from '../utils/storage-util';

import APIService from './api.service';

export default class CommentService extends APIService {
  addComment = async (
    taskId: string,
    content: string,
  ): Promise<ApiResponse<Comment>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      const response = await this.apiClient.post(
        '/tasks/comments',
        { taskId, content },
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        },
      );
      return new ApiResponse(new Comment(response.data as JsonObject), undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  getComments = async (taskId: string): Promise<ApiResponse<Comment[]>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      const response = await this.apiClient.get(`/tasks/comments/${taskId}`, {
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
    content: string,
  ): Promise<ApiResponse<Comment>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      const response = await this.apiClient.put(
        `/tasks/comments`,
        { commentId, content },
        {
          headers: {
            Authorization: `Bearer ${userAccessToken.token}`,
          },
        },
      );
      return new ApiResponse(new Comment(response.data as JsonObject), undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  deleteComment = async (commentId: string): Promise<ApiResponse<void>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();
      await this.apiClient.delete(`/tasks/comments/${commentId}`, {
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