import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';

import { TodoController } from './todo-controller';

export default class TodoRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new TodoController();

    router.use(accessAuthMiddleware);

    router.post('/', ctrl.createTodo);
    router.delete('/:id', ctrl.deleteTodo);
    router.patch('/:id', ctrl.updateTodo);
    router.get('/:id', ctrl.getTodo);
    router.get('/', ctrl.getTodos);
  }
}
