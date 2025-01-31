import { Schema, Types } from 'mongoose';

export interface TodoDB {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  title: string;
  description: string;
  isCompleted: boolean;
  type: string;
  dueDate: Date;
}

export const TodoDbSchema = new Schema<TodoDB>(
  {
    title: {
      type: String,
      required: true,
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
    isCompleted: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  {
    collection: 'todos',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
