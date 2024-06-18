import { Schema, Types } from 'mongoose';

export interface TaskDB {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  active: boolean;
  description: string;
  title: string;
  sharedWith: Types.ObjectId[];
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
    sharedWith: [{
      type: Schema.Types.ObjectId,
      ref: 'Account',
      index: true,
    }],
  },
  {
    collection: 'tasks',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
