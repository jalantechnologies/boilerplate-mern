import { Schema, Types } from 'mongoose';
import { ContactNumber } from '../../../account';
import { OtpStatus } from '../../types';

export interface OtpDB {
  _id: Types.ObjectId;
  active: boolean;
  contactNumber: ContactNumber;
  otpCode: string;
  status: OtpStatus;
}

export const OtpDbSchema: Schema = new Schema<OtpDB>(
  {
    active: {
      required: true,
      type: Boolean,
    },
    contactNumber: {
      index: true,
      required: true,
      type: {
        countryCode: String,
        phoneNumber: String,
      },
    },
    otpCode: {
      required: true,
      type: String,
    },
    status: {
      enum: Object.values(OtpStatus),
      required: true,
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
