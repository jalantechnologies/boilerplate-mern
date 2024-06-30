import { ApplicationServer } from '../../application';

import CommentRouter from '../rest-api/comment-router';

export default class CommentServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new CommentRouter();

    server.use('/comments', router.router);
  }
}
