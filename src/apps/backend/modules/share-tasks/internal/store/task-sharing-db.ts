import { Schema, Types, Document, model } from 'mongoose';

export interface TaskSharingRecord extends Document {
  taskId: Types.ObjectId;
  userId: Types.ObjectId;
}


export const TaskSharingSchema: Schema<TaskSharingRecord> = new Schema(
  {
    taskId: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    collection: 'task-sharings',
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);


TaskSharingSchema.index({ taskId: 1, userId: 1 }, { unique: true });


const TaskSharingModel = model<TaskSharingRecord>('TaskSharing', TaskSharingSchema);

export default TaskSharingModel;
