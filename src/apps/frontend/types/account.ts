import { JsonObject } from './common-types';

export class Account {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
  username: string;

  constructor(json: JsonObject) {
    this.id = json.id as string;
    this.displayName = (`${json.firstName as string} ${json.lastName as string}`).trim();
    this.firstName = json.firstName as string;
    this.lastName = json.lastName as string;
    this.username = json.username as string;
  }
}
