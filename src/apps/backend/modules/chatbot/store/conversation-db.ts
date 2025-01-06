import { Schema, Types } from 'mongoose';
import { ConversationType } from '../types';

export interface ConversationDB {
  _id: Types.ObjectId;
  type: ConversationType;
  active: boolean;
  message: string;
}

export const ConversationDbSchema = new Schema<ConversationDB>(
  {
    active: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
