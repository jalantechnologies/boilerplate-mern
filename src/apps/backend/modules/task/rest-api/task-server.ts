import { ApplicationServer } from 'modules/application';
import TaskRouter from 'modules/task/rest-api/task-router';

export default class TaskServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new TaskRouter();

    server.use('/tasks', router.router);
  }
}
