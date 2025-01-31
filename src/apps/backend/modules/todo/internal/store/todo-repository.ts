import { ApplicationRepository } from '../../../application';

import { TodoDB, TodoDbSchema } from './todo-db';

const TodoRepository = ApplicationRepository<TodoDB>('Todo', TodoDbSchema);

export default TodoRepository;
