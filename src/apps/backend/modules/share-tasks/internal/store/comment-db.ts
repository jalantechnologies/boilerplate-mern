import { Schema, Types } from 'mongoose';

export interface CommentDB {
  _id: Types.ObjectId;
  task: Types.ObjectId;
  user: Types.ObjectId;
  comment: string;
  active: boolean;
}

export const CommentDbSchema: Schema = new Schema<CommentDB>(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
      index: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
      index: true
    },
    comment: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    collection: 'comments',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  }
);