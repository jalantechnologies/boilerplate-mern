import { Application } from 'express';

import TaskRESTApiServer from './rest-api/task-rest-api-server';

export default class TaskServiceManager {
  public static async createRestAPIServer(): Promise<Application> {
    return TaskRESTApiServer.create();
  }
}
