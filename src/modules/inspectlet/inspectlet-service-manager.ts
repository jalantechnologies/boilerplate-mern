import { Application } from 'express';
import InspectletRESTApiServer from './rest-api/inspectlet-rest-api-server';

export default class InspectletServiceManager {
  public static async createRestAPIServer(): Promise<Application> {
    return InspectletRESTApiServer.create();
  }
}
