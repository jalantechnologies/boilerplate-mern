import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import CommentService from '../comment/comment-service';
import {
  CreateCommentParams,
  UpdateCommentParams,
  DeleteCommentParams,
} from '../types';
import { Types } from 'mongoose';

export class CommentController {
  createComment = applicationController(
    async (req: Request<CreateCommentParams>, res: Response) => {
      const { taskId, content } = req.body;
      const userId = req.user._id; // Assuming user ID is available in req.user
      const comment = await CommentService.createComment(new Types.ObjectId(taskId), new Types.ObjectId(userId), content);
      res.status(HttpStatusCodes.CREATED).send(comment);
    },
  );

  getComments = applicationController(
    async (req: Request, res: Response) => {
      const { taskId } = req.params;
      const comments = await CommentService.getCommentsByTaskId(new Types.ObjectId(taskId));
      res.status(HttpStatusCodes.OK).send(comments);
    },
  );

  updateComment = applicationController(
    async (req: Request<UpdateCommentParams>, res: Response) => {
      const { commentId, content } = req.body;
      const comment = await CommentService.updateComment(new Types.ObjectId(commentId), content);
      res.status(HttpStatusCodes.OK).send(comment);
    },
  );

  deleteComment = applicationController(
    async (req: Request<DeleteCommentParams>, res: Response) => {
      const { commentId } = req.params;
      await CommentService.deleteComment(new Types.ObjectId(commentId));
      res.status(HttpStatusCodes.NO_CONTENT).send();
    },
  );
}