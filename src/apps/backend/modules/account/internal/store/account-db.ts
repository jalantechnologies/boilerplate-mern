import { Schema, Types } from 'mongoose';

interface PhoneNumber {
  countryCode: string;
  phoneNumber: string;
}

export interface AccountDB {
  _id: Types.ObjectId;
  active: boolean;
  firstName: string;
  hashedPassword: string;
  lastName: string;
  phoneNumber: PhoneNumber;
  username: string;
}

export const AccountDbSchema: Schema = new Schema<AccountDB>(
  {
    active: {
      type: Boolean,
      required: true,
    },
    firstName: {
      default: '',
      type: String,
    },
    hashedPassword: {
      default: '',
      type: String,
    },
    lastName: {
      default: '',
      type: String,
    },
    phoneNumber: {
      default: null,
      type: {
        countryCode: String,
        phoneNumber: String,
      },
      index: true,
    },
    username: {
      default: '',
      type: String,
      index: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);