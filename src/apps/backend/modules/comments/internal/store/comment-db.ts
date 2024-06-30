import { Schema, Types, Document, model } from 'mongoose';

export interface CommentDB extends Document {
  task: Types.ObjectId;
  user: Types.ObjectId;
  comment: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const CommentSchema: Schema<CommentDB> = new Schema<CommentDB>(
  {
    task: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
      index: true,
    },
    comment: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: 'comments',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

CommentSchema.index({ task: 1, user: 1, createdAt: 1 });

const CommentModel = model<CommentDB>('Comment', CommentSchema);
export default CommentModel;
