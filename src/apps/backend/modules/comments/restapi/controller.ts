import { Request, Response } from 'express';
import { CommentService } from '../commentservice';

export default class CommentController {
  private commentService: CommentService;

  constructor(commentService: CommentService) {
    this.commentService = commentService;
  }

  public async getComments(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const comments = await this.commentService.getCommentsByTask(taskId);
      res.status(200).json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  }

  public async addComment(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const { userId, content } = req.body;
      const comment = await this.commentService.addComment(taskId, userId, content);
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add comment' });
    }
  }

  public async updateComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      const comment = await this.commentService.editComment(commentId, content);
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update comment' });
    }
  }

  public async deleteComment(req: Request, res: Response) {
    try {
      const { commentId } = req.params;
      await this.commentService.removeComment(commentId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  }
}
