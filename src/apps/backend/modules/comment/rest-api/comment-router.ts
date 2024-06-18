import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';

import { CommentController } from './comment-controller';

export default class CommentRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new CommentController();

    router.use(accessAuthMiddleware);

    router.post('/', ctrl.createComment);
    router.get('/:taskId', ctrl.getComments);
    router.patch('/:commentId', ctrl.updateComment);
    router.delete('/:commentId', ctrl.deleteComment);
  }
}
