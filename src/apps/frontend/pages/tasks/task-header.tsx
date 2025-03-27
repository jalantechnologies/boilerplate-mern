import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { Button, HeadingLarge } from '../../components';
import { AsyncError } from '../../types';
import { ButtonSize } from '../../types/button';

import TaskModal from './task-modal';
import useTaskForm from './tasks-form.hook';

interface TaskHeaderProps {
  onError: (error: AsyncError) => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ onError }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSuccess = () => {
    toast.success('Task has been added successfully');
    setIsModalOpen(false);
  };

  const { addTaskFormik } = useTaskForm({
    onError,
    onSuccess,
  });

  return (
    <div className="rounded-sm  border border-stroke bg-white p-3 shadow-default">
      <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center ">
        <div className="pl-2">
          <HeadingLarge>Tasks</HeadingLarge>
        </div>
        <div>
          <Button
            onClick={() => setIsModalOpen(!isModalOpen)}
            size={ButtonSize.COMPACT}
            startEnhancer={
              <img src="assets/svg/plus-icon.svg" alt="Plus Icon" />
            }
          >
            Add task
          </Button>
        </div>
        <TaskModal
          formik={addTaskFormik}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          btnText={'Add Task'}
          onError={onError}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
};

export default TaskHeader;
