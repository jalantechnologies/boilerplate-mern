import { ApplicationServer } from '../../application';

import TodoRouter from './todo-router';

export default class TodoServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new TodoRouter();

    server.use('/todo', router.router);
  }
}
