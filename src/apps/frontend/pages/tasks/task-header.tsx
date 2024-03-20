import React, { useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../../components/button';
import HeadingLarge from '../../components/typography/heading-large';
import { TaskOperationType } from '../../types/task';

import TaskItemLayout from './task-item.layout';
import TaskModal from './task-modal';
import useTaskForm from './tasks-form.hook';

const TaskHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSuccess = () => {
    toast.success('Task has been added successfully');
    setIsModalOpen(false);
  };

  const { addTaskFormik, setFormikFieldValue } = useTaskForm({
    onSuccess,
  });

  return (
    <TaskItemLayout>
      <HeadingLarge>Tasks</HeadingLarge>

      <div className="flex flex-col gap-4 2xsm:flex-row 2xsm:items-center">
        <Button onClick={() => setIsModalOpen(!isModalOpen)}>
          <img src="assets/svg/plus-icon.svg" alt="Plus Icon" />
          Add task
        </Button>
        <TaskModal
          formik={addTaskFormik}
          setFieldValue={setFormikFieldValue}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          btnText={'Add Task'}
          taskOperationType={TaskOperationType.ADD}
        />
      </div>
    </TaskItemLayout>
  );
};

export default TaskHeader;
