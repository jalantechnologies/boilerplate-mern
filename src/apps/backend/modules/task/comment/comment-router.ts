import { Router } from 'express';
import { CommentController } from './comment-controller';
import { accessAuthMiddleware } from '../../access-token';

export default class CommentRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.configure();
  }

  private configure(): void {
    const ctrl = new CommentController();

    this.router.use(accessAuthMiddleware);

    this.router.post('/', ctrl.createComment);
    this.router.get('/:taskId', ctrl.getComments);
    this.router.put('/', ctrl.updateComment);
    this.router.delete('/:commentId', ctrl.deleteComment);
  }
}