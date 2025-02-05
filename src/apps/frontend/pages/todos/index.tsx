import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

import { HeadingMedium, VerticalStackLayout } from '../../components';
import { useTodoContext } from '../../contexts';
import { AllTodos, AsyncError } from '../../types';

import TodoHeader from './todo-header';
import TodoSection from './todo-section';

const Todos: React.FC = () => {
  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  const { deleteTodo, getTodos, isGetTodosLoading, setTodosList, todosList } =
    useTodoContext();
  useEffect(() => {
    getTodos().catch((error) => onError(error as AsyncError));
  }, []);
  const handleDeleteTodo = (todoId: string) => {
    deleteTodo(todoId)
      .then(() => {
        const newTodosList: AllTodos = {
          overdue: [],
          completed: [],
          pending: [],
        };
        newTodosList.overdue = todosList.overdue.filter(
          (todo) => todo.id !== todoId,
        );
        newTodosList.completed = todosList.completed.filter(
          (todo) => todo.id !== todoId,
        );
        newTodosList.pending = todosList.pending.filter(
          (todo) => todo.id !== todoId,
        );
        setTodosList(newTodosList);
      })
      .catch((error) => onError(error as AsyncError));
  };

  return (
    <div className="mx-auto max-w-5xl overflow-y-auto">
      <VerticalStackLayout gap={7}>
        <HeadingMedium>TodoList</HeadingMedium>
        <TodoHeader />
        {isGetTodosLoading ? (
          <div>Loading...</div>
        ) : (
          <TodoSection
            todos={todosList}
            isGetTodosLoading={isGetTodosLoading}
            handleDeleteTodo={handleDeleteTodo}
          />
        )}
      </VerticalStackLayout>
    </div>
  );
};

export default Todos;
