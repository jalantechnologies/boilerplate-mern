import TodoReader from './internal/todo-reader';
import TodoWriter from './internal/todo-writer';
import {
  CreateTodoParams,
  DeleteTodoParams,
  GetTodoParams,
  Todo,
  UpdateTodoParams,
  GetAllTodoParams,
  TodoDbError,
  TodoNotFoundError,
} from './types';

export default class TodoService {
  public static async createTodo(params: CreateTodoParams): Promise<Todo> {
    try {
      return await TodoWriter.createTodo(params);
    } catch (error) {
      throw new TodoDbError();
    }
  }

  public static async deleteTodo(params: DeleteTodoParams): Promise<void> {
    try {
      await TodoWriter.deleteTodo(params);
    } catch (error) {
      throw new TodoDbError();
    }
  }

  public static async updateTodo(params: UpdateTodoParams): Promise<Todo> {
    try {
      return await TodoWriter.updateTodo(params);
    } catch (error) {
      throw new TodoDbError();
    }
  }

  public static async getTodoForAccount(params: GetTodoParams): Promise<Todo> {
    try {
      return await TodoReader.getTodoForAccount(params);
    } catch (error) {
      throw new TodoNotFoundError(params.todoId);
    }
  }

  public static async getAllTodosForAccount(params: GetAllTodoParams): Promise<{
    completed: Todo[];
    overdue: Todo[];
    pending: Todo[];
  }> {
    try {
      return await TodoReader.getAllTodosForAccount(params);
    } catch (error) {
      throw new TodoDbError();
    }
  }
}
