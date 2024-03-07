import { Schema, Types } from 'mongoose';

export interface AccountDB {
  _id: Types.ObjectId;
  active: boolean;
  contactNumber: string;
  username: string;
  hashedPassword: string;
}

export const AccountDbSchema: Schema = new Schema<AccountDB>(
  {
    active: {
      type: Boolean,
      required: true,
    },
    contactNumber: {
      type: String,
      index: true,
      unique: true,
    },
    hashedPassword: {
      type: String,
    },
    username: {
      type: String,
      index: true,
      unique: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
