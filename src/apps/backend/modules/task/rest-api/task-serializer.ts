import { Task } from '../types';

export const serializeTask = (task: Task): unknown => ({
  id: task.id,
  account: task.account,
  name: task.name,
});
