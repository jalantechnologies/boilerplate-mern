import { JsonObject } from './common-types';

export class Comment {
  _id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(json: JsonObject) {
    this._id = json._id as string;
    this.taskId = json.taskId as string;
    this.userId = json.userId as string;
    this.content = json.content as string;
    this.createdAt = new Date(json.createdAt as string);
    this.updatedAt = new Date(json.updatedAt as string);
  }
}