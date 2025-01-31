import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { Button, HeadingLarge } from '../../components';
import { AsyncError } from '../../types';
import { ButtonSize } from '../../types/button';

import TodoModal from './todo-modal';
import useTodoForm from './todos-form.hook';

interface TodoHeaderProps {
  onError?: (error: AsyncError) => void;
}

const TodoHeader: React.FC<TodoHeaderProps> = ({ onError }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSuccess = () => {
    toast.success('Todo has been added successfully');
    setIsModalOpen(false);
  };

  const { createTodoFormik } = useTodoForm({
    onError,
    onSuccess,
  });

  return (
    <div className="rounded-sm  border border-stroke bg-white p-3 shadow-default">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center ">
        <div className="pl-2">
          <HeadingLarge>Todos</HeadingLarge>
        </div>
        <div>
          <Button
            onClick={() => setIsModalOpen(!isModalOpen)}
            size={ButtonSize.COMPACT}
            startEnhancer={
              <img src="assets/svg/plus-icon.svg" alt="Plus Icon" />
            }
          >
            Add todo
          </Button>
        </div>
      </div>
      <TodoModal
        formik={createTodoFormik}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        btnText={'Add Todo'}
      />
    </div>
  );
};

export default TodoHeader;
