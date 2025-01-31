import React, { useState } from 'react';
import toast from 'react-hot-toast';

import {
  Button,
  HeadingSmall,
  LabelLarge,
  MenuItem,
  ParagraphSmall,
  Spinner,
  VerticalStackLayout,
} from '../../components';
import { AllTodos, AsyncError } from '../../types';
import { ButtonKind, ButtonSize } from '../../types/button';
import { Todo } from '../../types/todo';

import TodoModal from './todo-modal';
import useTodoForm from './todos-form.hook';

interface TodoSectionProps {
  handleDeleteTodo: (todoId: string) => void;
  isGetTodosLoading: boolean;
  onError?: (error: AsyncError) => void;
  todos: AllTodos;
}

const TodoSection: React.FC<TodoSectionProps> = ({
  handleDeleteTodo,
  isGetTodosLoading,
  onError,
  todos,
}) => {
  const [updateTodoModal, setUpdateTodoModal] = useState(false);
  const onSuccess = () => {
    toast.success('Todo has been updated successfully');
    setUpdateTodoModal(false);
  };

  const { updateTodoFormik, setFormikFieldValue } = useTodoForm({
    onError,
    onSuccess,
  });

  const handleTodoOperation = (todo: Todo) => {
    setUpdateTodoModal(true);
    setFormikFieldValue(updateTodoFormik, 'title', todo.title);
    setFormikFieldValue(updateTodoFormik, 'id', todo.id);
    setFormikFieldValue(updateTodoFormik, 'description', todo.description);
    setFormikFieldValue(updateTodoFormik, 'type', todo.type);
    setFormikFieldValue(updateTodoFormik, 'dueDate', new Date(todo.dueDate));
    setFormikFieldValue(updateTodoFormik, 'isCompleted', todo.isCompleted);
  };

  if (isGetTodosLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const renderTodos = (todoL: Todo[], status: string, bgcolor: string) => (
    <>
      <div className="mt-5">
        {todoL.length > 0 && <HeadingSmall>{status}</HeadingSmall>}
      </div>
      {todoL.length > 0 &&
        todoL.map((todo) => (
          <div
            className={`relative h-[200px] rounded-sm border border-stroke ${bgcolor} mt-5 bg-opacity-70 p-9 shadow-default`}
            key={todo.id}
          >
            <VerticalStackLayout gap={3}>
              <LabelLarge>{todo.title}</LabelLarge>
              <ParagraphSmall>{todo.description}</ParagraphSmall>
              <div className="absolute bottom-4 right-4">
                <ParagraphSmall>
                  Due Date: {new Date(todo.dueDate).toLocaleDateString('en-IN')}
                </ParagraphSmall>
                <ParagraphSmall>Type: {todo.type}</ParagraphSmall>
              </div>
            </VerticalStackLayout>

            <div className="absolute right-4 top-4">
              <MenuItem>
                <Button
                  onClick={() => handleTodoOperation(todo)}
                  kind={ButtonKind.SECONDARY}
                  size={ButtonSize.DEFAULT}
                  startEnhancer={
                    <img src="assets/svg/edit-icon.svg" alt="Edit todo" />
                  }
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteTodo(todo.id)}
                  kind={ButtonKind.SECONDARY}
                  size={ButtonSize.DEFAULT}
                  startEnhancer={
                    <img src="assets/svg/delete-icon.svg" alt="Delete todo" />
                  }
                >
                  Delete
                </Button>
              </MenuItem>
            </div>
          </div>
        ))}
    </>
  );

  return (
    <div className="overflow-y-auto">
      <VerticalStackLayout gap={7}>
        <div className="overflow-y-auto">
          {todos &&
            todos.pending &&
            renderTodos(todos.pending, 'Pending Todos', 'bg-yellow-500')}
          {todos &&
            todos.completed &&
            renderTodos(todos.completed, 'Completed Todos', 'bg-green-500')}
          {todos &&
            todos.overdue &&
            renderTodos(todos.overdue, 'Overdue Todos', 'bg-red-500')}
        </div>
        <TodoModal
          formik={updateTodoFormik}
          isModalOpen={updateTodoModal}
          setIsModalOpen={setUpdateTodoModal}
          btnText={'Update Todo'}
        />
      </VerticalStackLayout>
    </div>
  );
};

export default TodoSection;
