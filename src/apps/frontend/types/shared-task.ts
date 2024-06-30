import { JsonObject } from './common-types';
import { Task } from './task';
import { Account } from './account';
export class SharedTask {
    id: string;
    task: Task;
    account: Account;
    sharedAt: Date;
    sharedBy: Account;
  
    constructor(json: JsonObject) {
      this.id = json.id as string;
      this.task = new Task(json.task as JsonObject);
      this.account = new Account(json.account as JsonObject);
      this.sharedAt = new Date(json.sharedAt as string);
      this.sharedBy = new Account(json.sharedBy as JsonObject);
    }
  }