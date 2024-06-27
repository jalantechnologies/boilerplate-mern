import { model, Document } from 'mongoose';
import { SharedTaskDB, SharedTaskDbSchema } from './shared-task-db';

interface SharedTaskDocument extends SharedTaskDB, Document {}

const SharedTaskModel = model<SharedTaskDocument>(
  'SharedTask',
  SharedTaskDbSchema,
);

export default {
  create: (data: Partial<SharedTaskDB>) => new SharedTaskModel(data).save(),
  find: (query: Partial<SharedTaskDB>) =>
    SharedTaskModel.find(query as any).exec(),
};
