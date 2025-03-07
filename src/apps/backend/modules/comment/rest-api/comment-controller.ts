import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import CommentService from '../comment-service';
import {
  Comment,
  CreateCommentParams,
  DeleteCommentParams,
  GetCommentsParams,
  UpdateCommentParams,
} from '../types';

import { serializeCommentAsJSON } from './comment-serializer';

export class CommentController {
  createComment = applicationController(
    async (req: Request<CreateCommentParams>, res: Response) => {
      const comment: Comment = await CommentService.createComment({
        accountId: req.accountId,
        taskId: req.body.taskId,
        content: req.body.content,
      });
      const commentJSON = serializeCommentAsJSON(comment);

      res.status(HttpStatusCodes.CREATED).send(commentJSON);
    }
  );

  getComments = applicationController(async (req: Request, res: Response) => {
    const params: GetCommentsParams = {
      taskId: req.params.taskId,
    };
    const comments: Comment[] = await CommentService.getComments(params);
    const commentsJSON = comments.map(serializeCommentAsJSON);

    res.status(HttpStatusCodes.OK).send(commentsJSON);
  });

  updateComment = applicationController(
    async (req: Request<UpdateCommentParams>, res: Response) => {
      const comment: Comment = await CommentService.updateComment({
        commentId: req.params.id,
        content: req.body.content,
      });
      const commentJSON = serializeCommentAsJSON(comment);

      res.status(HttpStatusCodes.OK).send(commentJSON);
    }
  );

  deleteComment = applicationController(
    async (req: Request<DeleteCommentParams>, res: Response) => {
      const comment: Comment = await CommentService.deleteComment({
        commentId: req.params.id,
      });
      const commentJSON = serializeCommentAsJSON(comment);

      res.status(HttpStatusCodes.CREATED).send(commentJSON);
    }
  );
}
