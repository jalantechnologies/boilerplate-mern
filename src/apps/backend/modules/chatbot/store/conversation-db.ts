import { Schema, Types } from 'mongoose';

import { ConversationType } from '../types';

export interface ConversationDB {
  _id: Types.ObjectId;
  accountId: string;
  active: boolean;
  message: string;
  type: ConversationType;
}

export const ConversationDbSchema = new Schema<ConversationDB>(
  {
    accountId: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(ConversationType),
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
    },
  },
);
