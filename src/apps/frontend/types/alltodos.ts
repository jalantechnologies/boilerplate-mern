import { JsonObject } from './common-types';
import { Todo } from './todo';

export class AllTodos {
  overdue: Todo[];
  completed: Todo[];
  pending: Todo[];

  constructor(
    overdue: JsonObject[],
    completed: JsonObject[],
    pending: JsonObject[],
  ) {
    this.overdue = overdue.map((todo) => new Todo(todo));
    this.completed = completed.map((todo) => new Todo(todo));
    this.pending = pending.map((todo) => new Todo(todo));
  }
}
