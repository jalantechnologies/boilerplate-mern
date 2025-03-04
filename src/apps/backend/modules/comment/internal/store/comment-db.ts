import { Schema, Types } from 'mongoose';

export interface CommentDB {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  content: string;
  task: Types.ObjectId;
}

export const CommentDbSchema = new Schema<CommentDB>(
  {
    content: {
      type: String,
      required: true,
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
  },
  {
    collection: 'comments',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);
