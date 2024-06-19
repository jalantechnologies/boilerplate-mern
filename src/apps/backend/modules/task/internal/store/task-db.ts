import { Schema, Types } from 'mongoose';

export interface TaskDB {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  active: boolean;
  description: string;
  title: string;
  shared_with: Types.ObjectId[]; // new field to store IDs of users with whom the task is shared
}

export const TaskDbSchema: Schema = new Schema<TaskDB>(
  {
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      index: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    shared_with: [{ type: Schema.Types.ObjectId, ref: 'Account' }], // new field
  },
  {
    collection: 'tasks',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);