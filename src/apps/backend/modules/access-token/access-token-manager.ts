import { Application } from 'express';

import AccessTokenRESTApiServer from './rest-api/access-token-rest-api-server';

export default class AccessTokenServiceManager {
  public static async createRestAPIServer(): Promise<Application> {
    return AccessTokenRESTApiServer.create();
  }
}
