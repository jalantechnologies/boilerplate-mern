import { Todo } from '../types';

import { TodoDB } from './store/todo-db';

export default class TodoUtil {
  public static convertTodoDBToTodo(todoDb: TodoDB): Todo {
    const todo = new Todo();
    todo.id = todoDb._id.toString();
    todo.description = todoDb.description;
    todo.title = todoDb.title;
    todo.type = todoDb.type;
    todo.dueDate = todoDb.dueDate;
    todo.isCompleted = todoDb.isCompleted;
    return todo;
  }
}
