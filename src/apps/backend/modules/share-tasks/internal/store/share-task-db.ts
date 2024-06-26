
//share-task-db.ts
import { Schema, Types } from 'mongoose';

export interface SharedTaskDB {
  _id: Types.ObjectId;
  taskId: Types.ObjectId;
  userId: Types.ObjectId;
}

export const SharedTaskDbSchema: Schema = new Schema<SharedTaskDB>(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    collection: 'shared-tasks',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

SharedTaskDbSchema.index({ taskId: 1, userId: 1 }, { unique: true });