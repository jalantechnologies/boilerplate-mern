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

export class User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;

  constructor(json: JsonObject) {
    this.id = json.id as string;
    this.firstName = json.firstName as string;
    this.lastName = json.lastName as string;
    this.username = json.username as string;
  }
}
