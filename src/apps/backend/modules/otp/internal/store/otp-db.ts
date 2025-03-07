import { Schema, Types } from 'mongoose';

import { OtpStatus } from '../../types';

interface PhoneNumber {
  countryCode: string;
  phoneNumber: string;
}

export interface OtpDB {
  _id: Types.ObjectId;
  active: boolean;
  otpCode: string;
  phoneNumber: PhoneNumber;
  status: OtpStatus;
}

export const OtpDbSchema = new Schema<OtpDB>(
  {
    active: {
      required: true,
      type: Boolean,
    },
    otpCode: {
      required: true,
      type: String,
    },
    phoneNumber: {
      index: true,
      required: true,
      type: {
        countryCode: String,
        phoneNumber: String,
      },
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
  }
);

OtpDbSchema.index({ phoneNumber: 1, active: 1 });
