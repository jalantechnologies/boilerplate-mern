import express, { Application } from 'express';
import bodyParser from 'body-parser';
import TaskRouter from './task-router';
import TaskRepository from '../internal/store/task-repository';

export default class TaskRESTApiServer {
  public static async create(): Promise<Application> {
    await TaskRepository.createDBConnection();

    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/accounts/:accountId/tasks', TaskRouter.getRoutes());

    return Promise.resolve(app);
  }
}
