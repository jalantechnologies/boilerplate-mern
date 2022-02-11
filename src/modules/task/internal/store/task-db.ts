import { Schema, Types } from 'mongoose';

export interface TaskDB {
  _id: Types.ObjectId;
  account: Types.ObjectId;
  active: boolean;
  name: string;
}

export const taskDBSchema: Schema = new Schema<TaskDB>(
  {
    active: { type: Boolean, required: false, default: true },
    // here I am not using ref: 'accounts' because here,
    // we may use different DBs for task microservice and account microservice
    // so the documents for task and account would not be in same database,
    // so no point in storing ref.
    // we have to populate values after fetching the task.
    // and then looking for it's account using account microservice.
    account: { type: Schema.Types.ObjectId, required: true },
    name: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
  },
  {
    collection: 'tasks',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
