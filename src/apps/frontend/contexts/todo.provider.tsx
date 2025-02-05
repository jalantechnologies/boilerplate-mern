import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { TodoService } from '../services';
import { ApiResponse, AsyncError , Todo , AllTodos } from '../types';

import useAsync from './async.hook';

type TodoContextType = {
  createTodo: (
    title: string,
    description: string,
    type: string,
    dueDate: Date,
  ) => Promise<Todo>;
  deleteTodo: (todoId: string) => Promise<void>;
  getTodos: () => Promise<AllTodos>;
  setTodosList: React.Dispatch<React.SetStateAction<AllTodos>>;
  updateTodo: (todoId: string, todoData: Partial<Todo>) => Promise<Todo>;
  isCreateTodoLoading: boolean;
  isDeleteTodoLoading: boolean;
  isGetTodosLoading: boolean;
  isUpdateTodoLoading: boolean;
  todo: Todo;
  todos: AllTodos;
  todosList: AllTodos;
  updatedTodo: Todo;
  createTodoError: AsyncError;
  deleteTodoError: AsyncError;
  getTodosError: AsyncError;
  updateTodoError: AsyncError;
};

const TodoContext = createContext<TodoContextType | null>(null);

const todoService = new TodoService();

export const useTodoContext = (): TodoContextType => useContext(TodoContext);

const createTodofn = async (
  title: string,
  description: string,
  type: string,
  dueDate: Date,
): Promise<ApiResponse<Todo>> =>
  todoService.createTodo(title, description, type, dueDate);

const updateTodofn = async (
  todoId: string,
  todoData: Todo,
): Promise<ApiResponse<Todo>> => todoService.updateTodo(todoId, todoData);

const deleteTodofn = async (todoId: string): Promise<ApiResponse<void>> =>
  todoService.deleteTodo(todoId);

export const TodoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [todosList, setTodosList] = useState<AllTodos>();

  const getTodosfn = async (): Promise<ApiResponse<AllTodos>> => {
    const response = await todoService.getTodos();
    setTodosList(response.data);
    return response;
  };

  const {
    asyncCallback: getTodos,
    error: getTodosError,
    isLoading: isGetTodosLoading,
    result: todos,
  } = useAsync(getTodosfn);

  const {
    asyncCallback: createTodo,
    error: createTodoError,
    isLoading: isCreateTodoLoading,
    result: todo,
  } = useAsync(createTodofn);

  const {
    asyncCallback: updateTodo,
    error: updateTodoError,
    isLoading: isUpdateTodoLoading,
    result: updatedTodo,
  } = useAsync(updateTodofn);

  const {
    asyncCallback: deleteTodo,
    error: deleteTodoError,
    isLoading: isDeleteTodoLoading,
  } = useAsync(deleteTodofn);

  return (
    <TodoContext.Provider
      value={{
        getTodos,
        getTodosError,
        isGetTodosLoading,
        createTodo,
        createTodoError,
        isCreateTodoLoading,
        updateTodo,
        updateTodoError,
        isUpdateTodoLoading,
        deleteTodo,
        deleteTodoError,
        isDeleteTodoLoading,
        todo,
        todos,
        todosList,
        setTodosList,
        updatedTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
