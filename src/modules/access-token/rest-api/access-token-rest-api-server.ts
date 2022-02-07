import express, { Application } from 'express';
import AccessTokenRouter from './access-token-router';

export default class AccessTokenRESTApiServer {
  public static async create(): Promise<Application> {
    const app = express();
    app.use('/access-tokens', AccessTokenRouter.getRoutes());
    return Promise.resolve(app);
  }
}
