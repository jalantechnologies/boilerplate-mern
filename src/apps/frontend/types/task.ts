import { JsonObject } from './common-types';

export enum TaskOperationType {
  ADD = 'add',
  EDIT = 'edit',
}
export class Task {
  id: string;
  description: string;
  title: string;
  sharedWith: string[];

  constructor(json: JsonObject) {
    this.id = json.id as string;
    this.description = json.description as string;
    this.title = json.title as string;
    this.sharedWith = json.sharedWith as string[];
  }
}
