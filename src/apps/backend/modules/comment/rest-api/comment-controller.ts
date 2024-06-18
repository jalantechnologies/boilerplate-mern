import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import CommentService from '../comment-service';
import {
  Comment,
  CreateCommentParams,
  GetTaskCommentsParams,
  DeleteCommentParams,
  UpdateCommentParams,
  GetCommentParams,
} from '../types';

import { serializeCommentAsJSON } from './comment-serializer';

export class CommentController {
  createComment = applicationController(async (
    req: Request<CreateCommentParams>,
    res: Response,
  ) => {
    const comment: Comment = await CommentService.createComment({
      accountId: req.accountId,
      comment: req.body.comment,
      taskId: req.body.taskId,
    });
    const commentJSON = serializeCommentAsJSON(comment);

    res
      .status(HttpStatusCodes.CREATED)
      .send(commentJSON);
  });

  deleteComment = applicationController(async (
    req: Request<DeleteCommentParams>,
    res: Response,
  ) => {
    await CommentService.deleteComment({
      commentId: req.params.commentId,
    });

    res
      .status(HttpStatusCodes.NO_CONTENT)
      .send();
  });

  getComments = applicationController(async (
    req: Request,
    res: Response,
  ) => {
    const params: GetTaskCommentsParams = {
      taskId: req.params.taskId
    };

    const comments = await CommentService.getCommentsForTask(params);
    const commentsJSON = comments.map((comment) => serializeCommentAsJSON(comment));

    res
      .status(HttpStatusCodes.OK)
      .send(commentsJSON);
  });

  getComment = applicationController(async (
    req: Request,
    res: Response,
  ) => {
    const params: GetCommentParams = {
      commentId: req.params.commentId
    };

    const comment = await CommentService.getComment(params);
    const commentsJSON = serializeCommentAsJSON(comment);

    res
      .status(HttpStatusCodes.OK)
      .send(commentsJSON);
  });

  updateComment = applicationController(async (
    req: Request<UpdateCommentParams>,
    res: Response,
  ) => {
    const updatedComment: Comment = await CommentService.updateComment({
      commentId: req.params.commentId,
      comment: req.body.comment,
    });
    const commentJSON = serializeCommentAsJSON(updatedComment);

    res
      .status(HttpStatusCodes.OK)
      .send(commentJSON);
  });
}
