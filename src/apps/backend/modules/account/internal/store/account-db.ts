import { Schema, Types } from 'mongoose';

export interface AccountDB {
  _id: Types.ObjectId;
  active: boolean;
  firstName: string;
  lastName: string;
  username: string;
  hashedPassword: string;
}

export const AccountDbSchema: Schema = new Schema<AccountDB>(
  {
    active: {
      type: Boolean,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      index: true,
      required: true,
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
