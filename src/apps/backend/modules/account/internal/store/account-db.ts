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
      default: null,
      type: {
        countryCode: String,
        phoneNumber: String,
      },
      index: true,
      unique: true,
    },
    firstName: {
      default: '',
      type: String,
    },
    lastName: {
      default: '',
      type: String,
    },
    hashedPassword: {
      default: '',
      type: String,
    },
    username: {
      default: '',
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
