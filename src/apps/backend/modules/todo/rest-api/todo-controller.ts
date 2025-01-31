import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import TodoService from '../todo-service';
import {
  Todo,
  CreateTodoParams,
  GetAllTodoParams,
  DeleteTodoParams,
  GetTodoParams,
  UpdateTodoParams,
} from '../types';

import { serializeTodoAsJSON } from './todo-serializer';

export class TodoController {
  createTodo = applicationController(
    async (req: Request<CreateTodoParams>, res: Response) => {
      const todo: Todo = await TodoService.createTodo({
        accountId: req.accountId,
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        dueDate: req.body.dueDate,
      });
      const todoJSON = serializeTodoAsJSON(todo);

      res.status(HttpStatusCodes.CREATED).send(todoJSON);
    },
  );

  deleteTodo = applicationController(
    async (req: Request<DeleteTodoParams>, res: Response) => {
      await TodoService.deleteTodo({
        accountId: req.accountId,
        todoId: req.params.id,
      });

      res.status(HttpStatusCodes.NO_CONTENT).send();
    },
  );

  updateTodo = applicationController(
    async (req: Request<UpdateTodoParams>, res: Response) => {
      const todo: Todo = await TodoService.updateTodo({
        accountId: req.accountId,
        todoId: req.params.id,
        title: req.body.title,
        description: req.body.description,
        type: req.body.type,
        dueDate: req.body.dueDate,
        isCompleted: req.body.isCompleted,
      });
      const todoJSON = serializeTodoAsJSON(todo);

      res.status(HttpStatusCodes.OK).send(todoJSON);
    },
  );

  getTodo = applicationController(
    async (req: Request<GetTodoParams>, res: Response) => {
      const todo: Todo = await TodoService.getTodoForAccount({
        accountId: req.accountId,
        todoId: req.params.id,
      });
      const todoJSON = serializeTodoAsJSON(todo);

      res.status(HttpStatusCodes.OK).send(todoJSON);
    },
  );

  getTodos = applicationController(async (req: Request, res: Response) => {
    const params: GetAllTodoParams = {
      accountId: req.accountId,
    };

    const todos = await TodoService.getAllTodosForAccount(params);

    const todosJSON = {
      overdue: todos.overdue.map(serializeTodoAsJSON),
      completed: todos.completed.map(serializeTodoAsJSON),
      pending: todos.pending.map(serializeTodoAsJSON),
    };

    res.status(HttpStatusCodes.OK).send(todosJSON);
  });
}
