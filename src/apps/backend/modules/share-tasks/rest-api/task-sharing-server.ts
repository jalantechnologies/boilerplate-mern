import { ApplicationServer } from '../../application';
import TaskSharingRouter from './task-sharing-router';

export default class TaskSharingServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const taskSharingRouter = new TaskSharingRouter();

    server.use('/tasks', taskSharingRouter.router); 
  }
}
