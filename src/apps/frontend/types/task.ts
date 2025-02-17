import { JsonObject } from './common-types';

export interface Comment {
  id: string;
  taskId: string;
  text: string;
  createdAt: string;
}

export enum TaskOperationType {
  ADD = 'add',
  EDIT = 'edit',
}
export class Task {
  id: string;
  description: string;
  title: string;
  comments?: Comment[];

  constructor(json: JsonObject) {
    this.id = json.id as string;
    this.description = json.description as string;
    this.title = json.title as string;
  }
}
