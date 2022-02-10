import { Schema } from 'mongoose';

const accountSchema: Schema = new Schema(
  {
    active: { type: Boolean, required: true },
    hashedPassword: { type: String, required: true },
    username: {
      type: String, index: true, required: true, unique: true,
    },
  },
  {
    collection: 'accounts',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

export default accountSchema;
