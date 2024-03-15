import { FormikProps } from 'formik';
import React, { useEffect } from 'react';

import { FormControl, Input } from '..';
import { Task } from '../../types/task';
import Button from '../button/button.component';
import TextArea from '../input/text-area';
import Modal from '../modal';

interface TaskModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  btnText: string;
  taskOperationType: string;
  task?: Task;
  formik: FormikProps<Task>;
  setFieldValue: (
    formik: FormikProps<Task>,
    field: string,
    value: string,
  ) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  btnText,
  formik,
  taskOperationType,
  task,
  setFieldValue,
}) => {
  useEffect(() => {
    if (taskOperationType === 'edit' && task) {
      setFieldValue(formik, 'title', task.title);
      setFieldValue(formik, 'id', task.id);
      setFieldValue(formik, 'description', task.description);
    }
  }, [taskOperationType, task]);

  const handleClick = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal isModalOpen={isModalOpen}>
      <div className="absolute right-1 top-1 sm:right-5 sm:top-5">
        <Button
          onClick={() => setIsModalOpen(false)}
          kind="tertiary"
          shape="circle"
        >
          <img src="assets/svg/close-icon.svg" className="fill-current" />
        </Button>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="py-5">
          <FormControl
            error={formik.touched.title && formik.errors.title}
            label={'Task Title'}
          >
            <Input
              data-testid="title"
              type="text"
              disabled={false}
              name="title"
              error={formik.touched.title && formik.errors.title}
              placeholder="Enter task title"
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
            />
          </FormControl>
        </div>

        <div className="mb-5">
          <FormControl
            error={formik.touched.description && formik.errors.description}
            label={'Task description'}
          >
            <TextArea
              cols={30}
              rows={7}
              value={formik.values.description}
              placeholder="Enter task description"
              onChange={formik.handleChange}
              disabled={false}
              error={formik.touched.description && formik.errors.description}
              name={'description'}
              onBlur={formik.handleBlur}
            />
          </FormControl>
        </div>

        <Button type="submit" onClick={handleClick}>
          <img src="assets/svg/plus-icon.svg" />
          {btnText}
        </Button>
      </form>
    </Modal>
  );
};

export default TaskModal;
