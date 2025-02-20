import APIService from './api.service';

class CommentService extends APIService {
  constructor() {
    super();
  }

  async getComments(taskId: string) {
    try {
      const response = await this.apiClient.get(`/comments/${taskId}`);
      return Array.isArray(response.data) ? response.data : []; // ✅ Ensure it's an array
    } catch (error) {
      console.error("Error fetching comments:", error);
      return []; // Return empty array on failure
    }
  }

  async createComment(taskId: string, userId: string, text: string) {
    try {
      const response = await this.apiClient.post(`/comments`, { taskId, userId, text });
      return response.data || {}; // Prevent undefined
    } catch (error) {
      console.error("Error creating comment:", error);
      return {};
    }
  }

  async updateComment(commentId: string, text: string) {
    try {
      const response = await this.apiClient.put(`/comments/${commentId}`, { text });
      return response.data || {}; // Prevent undefined
    } catch (error) {
      console.error("Error updating comment:", error);
      return {};
    }
  }

  async deleteComment(commentId: string) {
    try {
      await this.apiClient.delete(`/comments/${commentId}`);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  }
}

export default new CommentService();
