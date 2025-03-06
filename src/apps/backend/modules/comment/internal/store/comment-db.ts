import { Schema, Types } from 'mongoose';

export interface CommentDB {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  content: string;
  task: Types.ObjectId;
}

export const CommentDbSchema = new Schema<CommentDB>(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
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
