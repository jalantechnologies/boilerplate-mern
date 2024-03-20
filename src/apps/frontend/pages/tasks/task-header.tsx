import React, { useState } from 'react';
import toast from 'react-hot-toast';

import {
  Button, Flex, FlexItem, HeadingLarge,
} from '../../components';
import { AsyncError } from '../../types';
import { TaskOperationType } from '../../types/task';

import TaskItemCard from './task-item-card';
import TaskModal from './task-modal';
import useTaskForm from './tasks-form.hook';

interface TaskHeaderProps {
  onError?: (error: AsyncError) => void;
}

const TaskHeader: React.FC<TaskHeaderProps> = ({ onError }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSuccess = () => {
    toast.success('Task has been added successfully');
    setIsModalOpen(false);
  };

  const { addTaskFormik, setFormikFieldValue } = useTaskForm({
    onError,
    onSuccess,
  });

  return (
    <TaskItemCard>
      <Flex alignItems='center' justifyContent='between'>
        <FlexItem >
          <HeadingLarge>Tasks</HeadingLarge>
        </FlexItem>
        <FlexItem >
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
        </FlexItem>
      </Flex>
    </TaskItemCard>
  );
};

export default TaskHeader;
