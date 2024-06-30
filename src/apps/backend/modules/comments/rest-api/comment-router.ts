import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';
import { CommentController } from './comment-controller';

export default class CommentRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const commentController = new CommentController();

    router.use(accessAuthMiddleware);

    router.post('/comments', commentController.createComment);
    router.put('/comments/:commentId', commentController.editComment);
    router.delete('/comments/:commentId', commentController.deleteComment);
    router.get('/tasks/:taskId/comments', commentController.getComments);
    router.post('/comments/reply', commentController.replyToComment);
  }
}
