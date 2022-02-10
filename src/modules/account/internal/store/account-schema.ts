import { Schema } from 'mongoose';
import IAccountDB from './account-db';

const accountDbSchema: Schema = new Schema<IAccountDB>(
  {
    active: { type: Boolean, required: true },
    hashedPassword: { type: String, required: true },
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

export default accountDbSchema;
