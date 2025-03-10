import { Schema, Types } from 'mongoose';

export interface ShareTaskDB {
  _id: Types.ObjectId;
  task: Types.ObjectId;
  sharedWith: Types.ObjectId;
}

export const ShareTaskDbSchema = new Schema<ShareTaskDB>(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    sharedWith: {
      type: Schema.Types.ObjectId,
      ref: 'accounts',
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
  }
);
