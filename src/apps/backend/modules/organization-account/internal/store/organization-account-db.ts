import { Schema, Types } from 'mongoose';

export interface OrganizationAccountDB {
  _id: Types.ObjectId;
}

export const organizationAccountDbSchema: Schema = new Schema<OrganizationAccountDB>(
  {
    //write schema here
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
