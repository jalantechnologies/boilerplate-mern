import { Application } from 'express';
import AccountRepository from './internal/store/account-repository';
import AccountRESTApiServer from './rest-api/account-rest-api-server';

export default class AccountServiceManager {
  public static async createRestAPIServer(): Promise<Application> {
    AccountRepository.initDb();
    return AccountRESTApiServer.create();
  }
}
