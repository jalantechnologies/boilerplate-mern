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
      index: true,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true,
    },
  },
  {
    collection: 'shared_tasks',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
