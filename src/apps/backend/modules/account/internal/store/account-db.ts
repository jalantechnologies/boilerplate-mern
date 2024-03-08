import { Schema, Types } from 'mongoose';

import { ContactNumber } from '../../types';

export interface AccountDB {
  _id: Types.ObjectId;
  active: boolean;
  contactNumber: ContactNumber;
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
    contactNumber: {
      type: Object,
      index: true,
      unique: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
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
