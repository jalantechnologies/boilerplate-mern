import { ApplicationServer } from 'backend/modules/application';
import TaskRouter from 'backend/modules/task/rest-api/task-router';

export default class TaskServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new TaskRouter();

    server.use('/tasks', router.router);
  }
}
