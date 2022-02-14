import express, { Application } from 'express';
import AccesstokenServiceManager from './modules/access-token/access-token-manager';
import AccountServiceManager from './modules/account/account-service-manager';

export default class MicroServices {
  public static async loadMicroServices(): Promise<Application> {
    const app = express();

    // loading the account microservice.
    const accountServiceRESTApi = await AccountServiceManager.createRestAPIServer();
    app.use('/', accountServiceRESTApi);

    // loading the access token microservice.
    const accessTokenServiceRESTApi = await AccesstokenServiceManager.createRestAPIServer();
    app.use('/', accessTokenServiceRESTApi);

    return app;
  }
}
