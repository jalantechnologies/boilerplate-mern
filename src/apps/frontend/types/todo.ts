import { JsonObject } from './common-types';

export enum TodoStatusType {
  OVERDUE = 'overdue',
  COMPLETED = 'completed',
  PENDING = 'pending',
}
export class Todo {
  id: string;
  description: string;
  title: string;
  isCompleted: boolean;
  type: string;
  dueDate: Date;

  constructor(json: JsonObject) {
    this.id = json.id as string;
    this.title = json.title as string;
    this.description = json.description as string;
    this.isCompleted = json.isCompleted as boolean;
    this.type = json.type as string;
    this.dueDate = json.dueDate as Date;
  }
}
