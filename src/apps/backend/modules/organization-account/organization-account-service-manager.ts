import { Application } from 'express';

import OrganizationAccountRESTApiServer from './rest-api/organization-account-rest-api-server';

export default class OrganizationAccountServiceManager {
  public static async createRestAPIServer(): Promise<Application> {
    return OrganizationAccountRESTApiServer.create();
  }
}
