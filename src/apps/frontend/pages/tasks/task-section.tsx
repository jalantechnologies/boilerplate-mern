import React, { useState } from 'react';
import toast from 'react-hot-toast';

import {
  Button,
  HeadingSmall,
  LabelLarge,
  MenuItem,
  ParagraphSmall,
  Spinner,
  VerticalStackLayout,
} from '../../components';
import { AsyncError } from '../../types';
import { ButtonKind, ButtonSize } from '../../types/button';
import { Task, TaskOperationType } from '../../types/task';

import TaskModal from './task-modal';
import useTaskForm from './tasks-form.hook';

interface TaskSectionProps {
  handleDeleteTask: (taskId: string) => void;
  isGetTasksLoading: boolean;
  onError?: (error: AsyncError) => void;
  tasks: Task[];
}

const TaskSection: React.FC<TaskSectionProps> = ({
  handleDeleteTask,
  isGetTasksLoading,
  onError,
  tasks,
}) => {
  const [updateTaskModal, setUpdateTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task>();
  const handleTaskOperation = (task: Task) => {
    setUpdateTaskModal(!updateTaskModal);
    setCurrentTask(task);
  };

  const onSuccess = () => {
    toast.success('Task has been updated successfully');
    setUpdateTaskModal(false);
  };

  const { updateFormik, setFormikFieldValue } = useTaskForm({
    onError,
    onSuccess,
  });

  if (isGetTasksLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <VerticalStackLayout gap={7}>
      {tasks.length > 0 && (
        <HeadingSmall>
          To Do's ({tasks.length >= 10 ? Math.floor(tasks.length / 10) : ''}
          {tasks.length % 10})
        </HeadingSmall>
      )}

      {tasks.map((task) => (
        <div
          className="relative rounded-sm border border-stroke bg-white p-9 shadow-default"
          key={task.id}
        >
          <VerticalStackLayout gap={3}>
            <LabelLarge>{task.title}</LabelLarge>
            <ParagraphSmall>{task.description}</ParagraphSmall>
          </VerticalStackLayout>

          <div className="absolute right-4 top-4">
            <MenuItem>
              <Button
                onClick={() => handleTaskOperation(task)}
                kind={ButtonKind.SECONDARY}
                size={ButtonSize.DEFAULT}
              >
                <img src="assets/svg/edit-icon.svg" alt="Edit task" />
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteTask(task.id)}
                kind={ButtonKind.SECONDARY}
                size={ButtonSize.DEFAULT}
              >
                <img src="assets/svg/delete-icon.svg" alt="Delete task" />
                Delete
              </Button>
            </MenuItem>
          </div>
        </div>
      ))}

      <TaskModal
        formik={updateFormik}
        setFieldValue={setFormikFieldValue}
        isModalOpen={updateTaskModal}
        setIsModalOpen={setUpdateTaskModal}
        btnText={'Update Task'}
        taskOperationType={TaskOperationType.EDIT}
        task={currentTask}
      />
    </VerticalStackLayout>
  );
};

export default TaskSection;
