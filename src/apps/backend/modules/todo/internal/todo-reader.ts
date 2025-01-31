import {
  GetTodoParams,
  Todo,
  TodoNotFoundError,
  GetAllTodoParams,
} from '../types';

import TodoRepository from './store/todo-repository';
import TodoUtil from './todo-util';

export default class TodoReader {
  public static async getTodoForAccount(params: GetTodoParams): Promise<Todo> {
    const todoDb = await TodoRepository.findOne({
      _id: params.todoId,
      account: params.accountId,
    });
    if (!todoDb) {
      throw new TodoNotFoundError(params.todoId);
    }

    return TodoUtil.convertTodoDBToTodo(todoDb);
  }

  public static async getAllTodosForAccount(params: GetAllTodoParams): Promise<{
    completed: Todo[];
    overdue: Todo[];
    pending: Todo[];
  }> {
    const todoDb = await TodoRepository.find({
      account: params.accountId,
    });

    if (todoDb.length === 0) {
      throw new TodoNotFoundError(params.accountId);
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const categorizedTodos = {
      completed: [] as Todo[],
      overdue: [] as Todo[],
      pending: [] as Todo[],
    };

    todoDb.forEach((todo) => {
      const convertedTodo = TodoUtil.convertTodoDBToTodo(todo);

      if (convertedTodo.isCompleted) {
        categorizedTodos.completed.push(convertedTodo);
      } else if (
        convertedTodo.dueDate &&
        new Date(convertedTodo.dueDate) < today
      ) {
        categorizedTodos.overdue.push(convertedTodo);
      } else {
        categorizedTodos.pending.push(convertedTodo);
      }
    });

    return categorizedTodos;
  }
}
