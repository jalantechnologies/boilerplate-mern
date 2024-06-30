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
import { Task } from '../../types/task';

import useTaskForm from './tasks-form.hook';

interface TaskModalProps {
  btnText: string;
  formik: FormikProps<Task>;
  isOpen: boolean;
  onError?: (error: AsyncError) => void;
  onSuccess?: () => void;
  setIsOpen: (open: boolean) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  btnText,
  formik,
  isOpen,
  onError,
  onSuccess,
  setIsOpen,
}) => {
  const { isAddTaskLoading, isUpdateTaskLoading } = useTaskForm({ onSuccess, onError });

  const handleClick = () => {
    if (isAddTaskLoading || isUpdateTaskLoading) {
      setIsOpen(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <div className="absolute right-1 top-1 sm:right-5 sm:top-5">
        <Button
          onClick={() => setIsOpen(false)}
          kind={ButtonKind.TERTIARY}
          startEnhancer={
            <img
              src="assets/svg/close-icon.svg"
              alt="close-icon"
              className="fill-current"
            />
          }
        />
      </div>

      <form onSubmit={formik.handleSubmit}>
        <VerticalStackLayout gap={5}>
          <FormControl
            error={formik.touched.title && formik.errors.title}
            label={'Task title'}
          >
            <Input
              data-testid="title"
              disabled={isAddTaskLoading}
              error={formik.touched.title && formik.errors.title}
              name="title"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter task title"
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
              placeholder="Enter task description"
              rows={7}
              value={formik.values.description}
            />
          </FormControl>
          <Button
            type={ButtonType.SUBMIT}
            onClick={handleClick}
            isLoading={btnText === 'Add Task' ? isAddTaskLoading : isUpdateTaskLoading}
            size={ButtonSize.DEFAULT}
            startEnhancer={
              !isAddTaskLoading && !isUpdateTaskLoading && (
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

export default TaskModal;
