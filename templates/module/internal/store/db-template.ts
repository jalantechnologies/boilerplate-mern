import { Schema, Types } from 'mongoose';

export interface $entityNameDB {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export const $entityNameDbSchema: Schema = new Schema<$entityNameDB>(
  {},
  {
    collection: '$moduleName',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
