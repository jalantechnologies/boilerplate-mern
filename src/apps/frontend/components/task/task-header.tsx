import React, { useState } from 'react';
import toast from 'react-hot-toast';

import useTaskForm from '../../pages/tasks/tasks-form.hook';
import { TaskOperationType } from '../../types/task';
import Button from '../button';
import TaskItemLayout from '../layouts/task-item.layout';

import TaskModal from './task-modal';

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
      <div className="pl-2 text-title-lg font-semibold text-black">
        Tasks
      </div>

      <div className="flex flex-col gap-4 2xsm:flex-row 2xsm:items-center">
          <Button onClick={() => setIsModalOpen(!isModalOpen)}>
            <img src="assets/svg/plus-icon.svg" />
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
