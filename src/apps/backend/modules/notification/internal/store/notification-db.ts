import { Schema, Types } from 'mongoose';

interface NotificationChannelPreferences {
  email: boolean;
  sms: boolean;
  push: boolean;
}

interface NotificationTypePreferences {
  update: boolean;
  promotional: boolean;
  transactional: boolean;
  security: boolean;
  reminder: boolean;
  social: boolean;
  alert: boolean;
}

export interface NotificationDB {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  notificationChannelPreferences: NotificationChannelPreferences;
  notificationTypePreferences: NotificationTypePreferences;
  fcmTokens: string[];
}

export const NotificationDbSchema = new Schema<NotificationDB>(
  {
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
      index: true,
    },
    notificationChannelPreferences: {
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
    notificationTypePreferences: {
      update: {
        type: Boolean,
        default: true,
      },
      promotional: {
        type: Boolean,
        default: true,
      },
      transactional: {
        type: Boolean,
        default: true,
      },
      security: {
        type: Boolean,
        default: true,
      },
      reminder: {
        type: Boolean,
        default: true,
      },
      social: {
        type: Boolean,
        default: true,
      },
      alert: {
        type: Boolean,
        default: true,
      },
    },
    fcmTokens: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);
