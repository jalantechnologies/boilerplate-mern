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

export class Comment {
  id: string;
  account: string;
  content: string;
  task: string;
  createdAt: string;

  constructor(json: JsonObject) {
    this.id = (json._id as string) || ''; // Ensure _id is mapped correctly
    this.account = (json.account as string) || '';
    this.content = (json.content as string) || '';
    this.task = (json.task as string) || '';
    this.createdAt = (json.createdAt as string) || new Date().toISOString();
  }
}
