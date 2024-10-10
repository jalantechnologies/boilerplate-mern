import { ApplicationServer } from '../../application';
import ExpressListRoutes from 'express-list-routes';

import * as fs from 'fs';

import TaskRouter from './task-router';

export default class TaskServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new TaskRouter();

    server.use('/tasks', router.router);

    const routes = ExpressListRoutes(server, { prefix: '/api', logger: false});

    fs.writeFileSync('sample-output.txt', routes.map(route => JSON.stringify(route)).join('\n'));
  }
}
