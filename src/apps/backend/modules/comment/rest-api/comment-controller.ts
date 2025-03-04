import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import CommentService from '../comment-service';
import { Comment, CreateCommentParams } from '../types';

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
}
