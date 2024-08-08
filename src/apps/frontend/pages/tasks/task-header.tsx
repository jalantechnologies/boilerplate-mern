import React, { useState } from 'react';
import toast from 'react-hot-toast';

import { Button, HeadingLarge, HorizontalStackLayout } from '../../components';
import { AsyncError } from '../../types';
import { ButtonKind, ButtonSize } from '../../types/button';

import TaskModal from './task-modal';
import useTaskForm from './tasks-form.hook';
import ShareTasksModal from './share-tasks-modal';

interface TaskHeaderProps {
  onError?: (error: AsyncError) => void;
  selectedTasks: string[];
  resetSelectedTasks: () => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({
  onError,
  selectedTasks,
  resetSelectedTasks,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isShareTasksModalOpen, setIsShareTasksModalOpen] = useState(false);

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
        <HorizontalStackLayout gap={3}>
          <Button
            onClick={() => setIsShareTasksModalOpen(!isShareTasksModalOpen)}
            size={ButtonSize.COMPACT}
            kind={ButtonKind.PRIMARY}
            disabled={selectedTasks.length === 0}
            startEnhancer={
              <img src="assets/svg/share-icon.svg" alt="Share Icon" />
            }
          >
            Share task(s)
          </Button>

          <Button
            onClick={() => setIsModalOpen(!isModalOpen)}
            size={ButtonSize.COMPACT}
            startEnhancer={
              <img src="assets/svg/plus-icon.svg" alt="Plus Icon" />
            }
          >
            Add task
          </Button>
        </HorizontalStackLayout>
        <TaskModal
          formik={addTaskFormik}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          btnText={'Add Task'}
        />
        <ShareTasksModal
          taskIds={selectedTasks}
          resetSelectedTasks={resetSelectedTasks}
          isModalOpen={isShareTasksModalOpen}
          setIsModalOpen={setIsShareTasksModalOpen}
          btnText={'Share Task'}
        />
      </div>
    </div>
  );
};

export default TaskHeader;
