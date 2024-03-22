import { FormikProps } from 'formik';
import React, { useEffect } from 'react';

import {
  Button,
  FormControl,
  Input,
  VerticalStackLayout,
} from '../../components';
import TextArea from '../../components/input/text-area';
import Modal from '../../components/modal';
import { AsyncError } from '../../types';
import { ButtonKind, ButtonType } from '../../types/button';
import { Task, TaskOperationType } from '../../types/task';

import useTaskForm from './tasks-form.hook';

interface TaskModalProps {
  btnText: string;
  formik: FormikProps<Task>;
  isModalOpen: boolean;
  onError?: (error: AsyncError) => void;
  onSuccess?: () => void;
  setIsModalOpen: (open: boolean) => void;
  setFieldValue: (
    formik: FormikProps<Task>,
    field: string,
    value: string,
  ) => void;
  task?: Task;
  taskOperationType: string;
}

const TaskModal: React.FC<TaskModalProps> = ({
  btnText,
  formik,
  isModalOpen,
  onError,
  onSuccess,
  setFieldValue,
  setIsModalOpen,
  task,
  taskOperationType,
}) => {
  const { isAddTaskLoading } = useTaskForm({ onSuccess, onError });

  useEffect(() => {
    if (taskOperationType === TaskOperationType.EDIT.toString() && task) {
      setFieldValue(formik, 'title', task.title);
      setFieldValue(formik, 'id', task.id);
      setFieldValue(formik, 'description', task.description);
    }
  }, [taskOperationType, task]);

  const handleClick = () => {
    if (isAddTaskLoading) {
      setIsModalOpen(false);
    }
  };

  return (
    <Modal isModalOpen={isModalOpen}>
      <div className="absolute right-1 top-1 sm:right-5 sm:top-5">
        <Button
          onClick={() => setIsModalOpen(false)}
          kind={ButtonKind.TERTIARY}
        >
          <img
            src="assets/svg/close-icon.svg"
            alt="close-icon"
            className="fill-current"
          />
        </Button>
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
            isLoading={isAddTaskLoading}
          >
            <img src="assets/svg/plus-icon.svg" alt="Plus Icon" />
            {btnText}
          </Button>
        </VerticalStackLayout>
      </form>
    </Modal>
  );
};

export default TaskModal;
