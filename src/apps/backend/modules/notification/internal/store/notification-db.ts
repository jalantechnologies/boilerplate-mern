import { Schema, Types } from 'mongoose';

interface NotificationPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
}

export interface NotificationDB {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  preferences: NotificationPreferences;
}

export const NotificationDbSchema = new Schema<NotificationDB>(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
      index: true,
    },
    preferences: {
      email: {
        type: Boolean,
        default: true,
      },
      sms: {
        type: Boolean,
        default: true,
      },
      push: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);
