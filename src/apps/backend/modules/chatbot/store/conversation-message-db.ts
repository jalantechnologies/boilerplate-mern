import { Schema, Types } from 'mongoose';

import { ConversationMessageType } from '../types';

export interface ConversationMessageDB {
  _id: Types.ObjectId;
  conversationId: string;
  message: string;
  type: ConversationMessageType;
}

export const ConversationMessageDbSchema = new Schema<ConversationMessageDB>(
  {
    conversationId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(ConversationMessageType),
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
    },
  },
);
