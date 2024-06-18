import { Schema, Types } from 'mongoose';

export interface CommentDB {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  task: Types.ObjectId;
  active: boolean;
  comment: string;
}

export const CommentDbSchema: Schema = new Schema<CommentDB>(
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
    comment: {
      type: String,
      required: true,
    },
    task: {
      type: Schema.Types.ObjectId,
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
