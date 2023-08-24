import { Schema, Types } from 'mongoose';

export interface OrganizationAccountDB {
  _id: Types.ObjectId;
}

export const organizationAccountDbSchema: Schema = new Schema<OrganizationAccountDB>(
  {
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
