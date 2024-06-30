import { Request, Response } from 'express';
import CommentService from '../comment-service';
import { HttpStatusCodes } from '../../http';
import { applicationController } from '../../application';
import { serializeCommentAsJSON } from './comment-serializer';
import { CreateCommentParams, EditCommentParams, GetCommentsParams } from '../types';

export class CommentController {
  createComment = applicationController(
    async (req: Request<{}, {}, CreateCommentParams>, res: Response) => {
      const comment = await CommentService.createComment({
        taskId: req.body.taskId,
        userId: req.body.userId,
        comment: req.body.comment,
      });
      const commentJSON = serializeCommentAsJSON(comment);
      res.status(HttpStatusCodes.CREATED).send(commentJSON);
    },
  );

  editComment = applicationController(
    async (req: Request<{}, {}, EditCommentParams>, res: Response) => {
      const comment = await CommentService.editComment({
        commentId: req.body.commentId,
        comment: req.body.comment,
      });
      if (comment) {
        const commentJSON = serializeCommentAsJSON(comment);
        res.status(HttpStatusCodes.OK).send(commentJSON);
      } else {
        res.status(HttpStatusCodes.NOT_FOUND).send({ error: 'Comment not found' });
      }
    },
  );

  deleteComment = applicationController(
    async (req: Request<{ commentId: string }>, res: Response) => {
      await CommentService.deleteComment(req.params.commentId);
      res.status(HttpStatusCodes.NO_CONTENT).send();
    },
  );

  getComments = applicationController(
    async (req: Request<GetCommentsParams>, res: Response) => {
      const comments = await CommentService.getComments({ taskId: req.params.taskId });
      const commentsJSON = comments.map(serializeCommentAsJSON);
      res.status(HttpStatusCodes.OK).send(commentsJSON);
    },
  );

  replyToComment = applicationController(
    async (req: Request<{}, {}, CreateCommentParams>, res: Response) => {
      const comment = await CommentService.replyToComment({
        taskId: req.body.taskId,
        userId: req.body.userId,
        comment: req.body.comment,
      });
      const commentJSON = serializeCommentAsJSON(comment);
      res.status(HttpStatusCodes.CREATED).send(commentJSON);
    },
  );
}
