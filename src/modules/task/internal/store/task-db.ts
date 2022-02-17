import { Schema, Types } from 'mongoose';

export interface TaskDB {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  active: boolean;
  name: string;
}

export const taskDbSchema: Schema = new Schema<TaskDB>(
  {
    active: { type: Boolean, required: true, default: true },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      index: true,
      required: true,
    },
    name: {
      type: String,
      index: true,
      required: true,
    },
  },
  {
    collection: 'tasks',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
