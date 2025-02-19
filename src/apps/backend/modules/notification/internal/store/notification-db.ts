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
        default: false,
      },
      sms: {
        type: Boolean,
        default: false,
      },
      push: {
        type: Boolean,
        default: false,
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
