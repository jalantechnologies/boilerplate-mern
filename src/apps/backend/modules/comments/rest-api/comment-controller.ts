import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import CommentService from '../comments-service';
import {
  Comment,
  CreateCommentParams,
  UpdateCommentParams,
  DeleteCommentParams,
  GetCommentParams,
} from '../types';

import { serializeCommentAsJSON } from './comment-serializer';

export class CommentController {
  createComment = applicationController(
    async (req: Request<CreateCommentParams>, res: Response) => {
      const comment: Comment = await CommentService.createComment({
        taskId: req.params.taskId,
        accountId: req.accountId,
        comment: req.body.comment,
      });
      const commentJSON = serializeCommentAsJSON(comment);

      res.status(HttpStatusCodes.CREATED).send(commentJSON);
    },
  );

  deleteComment = applicationController(
    async (req: Request<DeleteCommentParams>, res: Response) => {
      await CommentService.deleteComment({
        accountId: req.accountId,
        commentId: req.params.id,
      });

      res.status(HttpStatusCodes.NO_CONTENT).send();
    },
  );

  getComments = applicationController(
    async (req: Request<GetCommentParams>, res: Response) => {
      const comments = await CommentService.getCommentsForTask(
        req.params.taskId,
      );
      const commentsJSON = comments.map((comment) =>
        serializeCommentAsJSON(comment),
      );

      res.status(HttpStatusCodes.OK).send(commentsJSON);
    },
  );

  updateComment = applicationController(
    async (req: Request<UpdateCommentParams>, res: Response) => {
      const updatedComment: Comment = await CommentService.updateComment({
        accountId: req.accountId,
        commentId: req.params.id,
        taskId: req.params.taskId,
        comment: req.body.comment,
      });
      const commentJSON = serializeCommentAsJSON(updatedComment);

      res.status(HttpStatusCodes.OK).send(commentJSON);
    },
  );
}
 