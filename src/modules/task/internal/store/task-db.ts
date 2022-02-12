import { Schema, Types } from 'mongoose';

export interface TaskDb {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  active: boolean;
  name: string;
}

export const taskDBSchema: Schema = new Schema<TaskDb>(
  {
    active: { type: Boolean, required: false, default: true },
    account: { type: Schema.Types.ObjectId, required: true },
    name: {
      type: String,
      index: true,
      required: true,
      unique: true,
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
