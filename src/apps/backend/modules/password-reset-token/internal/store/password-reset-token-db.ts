import { Schema, Types } from 'mongoose';

export interface PasswordResetTokenDB {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  expiresAt: Date;
  token: string;
  isUsed: boolean;
}

export const passwordResetTokenDbSchema = new Schema<PasswordResetTokenDB>(
  {
    account: {
      ref: 'Account',
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
