import { JsonObject } from './common-types';

export enum TaskOperationType {
  ADD = 'add',
  EDIT = 'edit',
}

export class Task {
  taskId: string;
  description: string;
  title: string;

  constructor(json: JsonObject) {
    this.taskId = json.id as string;
    this.description = json.description as string;
    this.title = json.title as string;
  }
}

// export class Account {
//   id: string;
//   displayName: string;
//   username: string;

//   constructor(json: JsonObject) {
//     this.id = json.id as string;
//     this.displayName = json.displayName as string;
//     this.username = json.username as string;
//   }
// }

