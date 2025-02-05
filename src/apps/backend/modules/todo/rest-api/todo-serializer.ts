import { Todo } from '../types';

export const serializeTodoAsJSON = (todo: Todo): unknown => ({
  id: todo.id,
  account: todo.accountId,
  description: todo.description,
  title: todo.title,
  isCompleted: todo.isCompleted,
  type: todo.type,
  dueDate: todo.dueDate,
});
