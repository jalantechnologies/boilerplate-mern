import { Schema, Types } from 'mongoose';

export interface ConversationDB {
  _id: Types.ObjectId;
  accountId: string;
  title: string;
  description: string;
}

export const ConversationDbSchema = new Schema<ConversationDB>(
  {
    accountId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
