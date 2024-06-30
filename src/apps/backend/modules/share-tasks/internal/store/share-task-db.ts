import { Schema, Types,  Document } from 'mongoose';

export interface SharedTaskDB extends Document {
  task: Types.ObjectId;
  account: Types.ObjectId;
}

export const SharedTaskDbSchema: Schema<SharedTaskDB> = new Schema(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
      
    },
    account: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
      
    },
  },
  {
    collection: 'shared-tasks',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

SharedTaskDbSchema.index({ task: 1, account: 1 }, { unique: true });


