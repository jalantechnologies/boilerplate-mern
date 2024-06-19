import { Schema, Types } from 'mongoose';

export interface CommentDB {
  _id: Types.ObjectId;
  task: Types.ObjectId;
  user: Types.ObjectId;
  text: string;
}

export const CommentDbSchema: Schema = new Schema<CommentDB>(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'comments',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);