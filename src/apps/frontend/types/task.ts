import { JsonObject } from './common-types';

export enum TaskOperationType {
  ADD = 'add',
  EDIT = 'edit',
}

export class Task {
  id: string;
  description: string;
  title: string;

  constructor(json: JsonObject) {
    this.id = json.id as string;
    this.description = json.description as string;
    this.title = json.title as string;
  }
}

export class Account {
  id: string;
  displayName: string;
  username: string;

  constructor(json: JsonObject) {
    this.id = json.id as string;
    this.displayName = json.displayName as string;
    this.username = json.username as string;
  }
}

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
