import { ApplicationServer } from '../../application';

import TaskRouter from './task-router';

export default class TaskServer extends ApplicationServer {
  constructor() {
    super(new TaskRouter().routerFilePath);
  }

  configure(): void {
    const { server } = this;
    const router = new TaskRouter();

    server.use('/tasks', router.router);
  }
}
