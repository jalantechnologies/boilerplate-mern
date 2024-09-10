import { Schema } from 'mongoose';

import { PasswordResetToken } from '../../types';

export const passwordResetTokenDbSchema = new Schema<PasswordResetToken>(
  {
    account: {
      ref: 'accounts',
      required: true,
      type: Schema.Types.ObjectId,
    },
    expiresAt: { type: Date, required: true },
    token: { type: String, required: true },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
