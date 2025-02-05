import { FormikProps } from 'formik';
import React from 'react';

import {
  Button,
  FormControl,
  Input,
  VerticalStackLayout,
} from '../../components';
import TextArea from '../../components/input/text-area';
import Modal from '../../components/modal';
import { AsyncError } from '../../types';
import { ButtonKind, ButtonSize, ButtonType } from '../../types/button';
import { Todo } from '../../types/todo';

import useTodoForm from './todos-form.hook';

interface TodoModalProps {
  btnText: string;
  formik: FormikProps<Todo>;
  isModalOpen: boolean;
  onError?: (error: AsyncError) => void;
  onSuccess?: () => void;
  setIsModalOpen: (open: boolean) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({
  btnText,
  formik,
  isModalOpen,
  onError,
  onSuccess,
  setIsModalOpen,
}) => {
  const { isCreateTodoLoading, isUpdateTodoLoading } = useTodoForm({
    onSuccess,
    onError,
  });

  const handleClick = () => {
    if (isCreateTodoLoading || isUpdateTodoLoading) {
      setIsModalOpen(false);
    }
  };

  return (
    <Modal isModalOpen={isModalOpen}>
      <div className="absolute right-1 top-1 sm:right-5 sm:top-5">
        <Button
          onClick={() => setIsModalOpen(false)}
          kind={ButtonKind.TERTIARY}
          startEnhancer={
            <img
              src="assets/svg/close-icon.svg"
              alt="close-icon"
              className="fill-current"
            />
          }
        ></Button>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <VerticalStackLayout gap={5}>
          <FormControl
            error={formik.touched.title && formik.errors.title}
            label={'Todo title'}
          >
            <Input
              data-testid="title"
              disabled={isCreateTodoLoading}
              error={formik.touched.title && formik.errors.title}
              name="title"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter todo title"
              type="text"
              value={formik.values.title}
            />
          </FormControl>
          <FormControl
            error={formik.touched.description && formik.errors.description}
            label={'Task description'}
          >
            <TextArea
              cols={30}
              disabled={false}
              error={formik.touched.description && formik.errors.description}
              name={'description'}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter todo description"
              rows={7}
              value={formik.values.description}
            />
          </FormControl>
          <FormControl
            error={
              formik.touched.dueDate && formik.errors.dueDate
                ? String(formik.errors.dueDate)
                : ''
            }
            label={'Due Date'}
          >
            <Input
              data-testid="dueDate"
              disabled={isCreateTodoLoading}
              error={
                formik.touched.dueDate && formik.errors.dueDate
                  ? String(formik.errors.dueDate)
                  : ''
              }
              name="dueDate"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter due date (e.g., 2025-01-30)"
              type="date"
              value={
                formik.values.dueDate
                  ? new Date(formik.values.dueDate).toISOString().split('T')[0]
                  : ''
              }
            />
          </FormControl>
          <FormControl
            error={formik.touched.type && formik.errors.type}
            label={'Todo Type'}
          >
            <Input
              data-testid="type"
              disabled={isCreateTodoLoading}
              error={formik.touched.type && formik.errors.type}
              name="type"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter todo type"
              type="text"
              value={formik.values.type}
            />
          </FormControl>
          {btnText !== 'Add Todo' && (
            <FormControl
              error={formik.touched.isCompleted && formik.errors.isCompleted}
              label={'Completed'}
            >
              <input
                type="checkbox"
                name="isCompleted"
                checked={formik.values.isCompleted}
                onChange={formik.handleChange}
              />
            </FormControl>
          )}
          <Button
            type={ButtonType.SUBMIT}
            onClick={handleClick}
            isLoading={
              btnText === 'Add Todo' ? isCreateTodoLoading : isUpdateTodoLoading
            }
            size={ButtonSize.DEFAULT}
            startEnhancer={
              !isCreateTodoLoading &&
              !isUpdateTodoLoading && (
                <img src="assets/svg/plus-icon.svg" alt="Plus Icon" />
              )
            }
          >
            {btnText}
          </Button>
        </VerticalStackLayout>
      </form>
    </Modal>
  );
};

export default TodoModal;
