import { OTPStatus } from 'backend/modules/authentication/types';
import { Schema, Types } from 'mongoose';

interface PhoneNumber {
  countryCode: string;
  phoneNumber: string;
}

export interface OTPDB {
  _id: Types.ObjectId;
  active: boolean;
  otpCode: string;
  phoneNumber: PhoneNumber;
  status: OTPStatus;
}

export const OTPDbSchema = new Schema<OTPDB>(
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
      enum: Object.values(OTPStatus),
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

OTPDbSchema.index({ phoneNumber: 1, active: 1 });
