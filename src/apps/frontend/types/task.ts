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
  account: { [key: string]: string };
  content: string;
  taskId: string;
  createdAt: string;

  constructor(json: JsonObject) {
    this.id = (json.id as string) || '';

    try {
      this.account =
        typeof json.account === 'string'
          ? (JSON.parse(
              json.account
                .replace(/new ObjectId\("(.*?)"\)/g, '"$1"') // Convert ObjectId to a string
                .replace(/(\w+):/g, '"$1":') // Add double quotes around keys
                .replace(/'/g, '"')
            ) as { [key: string]: string })
          : (json.account as { [key: string]: string }) || {};
    } catch (error) {
      console.error('Error parsing account:', error);
      this.account = {}; // Fallback in case of error
    }

    this.content = (json.content as string) || '';
    this.taskId = (json.taskId as string) || '';
    this.createdAt = (json.createdAt as string) || new Date().toISOString();
  }
}
