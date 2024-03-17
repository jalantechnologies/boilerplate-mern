import { JsonObject } from './common-types';

export class Account {
  id: string;
  name: string;
  username: string;

  constructor(json: JsonObject) {
    this.id = json.id as string;
    this.name = json.name as string;
    this.username = json.username as string;
  }
}
