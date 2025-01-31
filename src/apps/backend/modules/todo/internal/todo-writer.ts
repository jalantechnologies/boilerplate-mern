import {
  CreateTodoParams,
  DeleteTodoParams,
  Todo,
  UpdateTodoParams,
  TodoNotFoundError,
  TodoDbError,
} from '../types';

import { TodoDB } from './store/todo-db';
import TodoRepository from './store/todo-repository';
import TodoUtil from './todo-util';

export default class TodoWriter {
  public static async createTodo(params: CreateTodoParams): Promise<Todo> {
    const createdTodo = await TodoRepository.create({
      account: params.accountId,
      description: params.description,
      title: params.title,
      type: params.type,
      dueDate: params.dueDate,
    });
    if (!createdTodo) {
      throw new TodoDbError();
    }
    return TodoUtil.convertTodoDBToTodo(createdTodo);
  }

  public static async updateTodo(params: UpdateTodoParams): Promise<Todo> {
    const updateFields: Partial<TodoDB> = {};

    if (params.description !== undefined)
      updateFields.description = params.description;
    if (params.title !== undefined) updateFields.title = params.title;
    if (params.type !== undefined) updateFields.type = params.type;
    if (params.dueDate !== undefined) updateFields.dueDate = params.dueDate;
    if (params.isCompleted !== undefined)
      updateFields.isCompleted = params.isCompleted;

    const todo = await TodoRepository.findOneAndUpdate(
      {
        account: params.accountId,
        _id: params.todoId,
      },
      { $set: updateFields },
      { new: true },
    );

    if (!todo) {
      throw new TodoNotFoundError(params.todoId);
    }

    return TodoUtil.convertTodoDBToTodo(todo);
  }

  public static async deleteTodo(params: DeleteTodoParams): Promise<void> {
    const todo = await TodoRepository.findOneAndDelete({
      account: params.accountId,
      _id: params.todoId,
    });
    if (!todo) {
      throw new TodoNotFoundError(params.todoId);
    }
  }
}
