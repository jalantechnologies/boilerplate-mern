import express, { Application } from 'express';
import TaskRouter from './task-router';

export default class TaskRESTApiServer {
  public static async create(): Promise<Application> {
    const app = express();
    // This method is called at the time of app start to let
    // module initialize its resources

    // TODO: Create a mongoose connection that is exclusively available to
    // Task service so it can persist the data

    // TODO: Register the REST APIs with application
    app.use('/tasks', TaskRouter.getRoutes());

    return Promise.resolve(app);
  }
}
