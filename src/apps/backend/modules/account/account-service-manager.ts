import { Application } from 'express';

import AccountRESTApiServer from './rest-api/account-rest-api-server';

export default class AccountServiceManager {
  public static async createRestAPIServer(): Promise<Application> {
    return AccountRESTApiServer.create();
  }
}
