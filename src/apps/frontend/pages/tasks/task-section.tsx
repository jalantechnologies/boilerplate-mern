import React, { useState } from 'react';
import toast from 'react-hot-toast';

import {
  Badge,
  Button,
  HeadingSmall,
  HorizontalStackLayout,
  Input,
  LabelLarge,
  MenuItem,
  ParagraphSmall,
  Spinner,
  VerticalStackLayout,
} from '../../components';
import { AsyncError } from '../../types';
import { ButtonKind, ButtonSize } from '../../types/button';
import { Task } from '../../types/task';

import TaskModal from './task-modal';
import useTaskForm from './tasks-form.hook';
import { getAccessTokenFromStorage } from '../../utils/storage-util';

interface TaskSectionProps {
  handleDeleteTask: (taskId: string) => void;
  handleTaskCheckBoxToggle: (taskId: string) => void;
  isGetTasksLoading: boolean;
  onError?: (error: AsyncError) => void;
  tasks: Task[];
  selectedTasks: string[];
}

const TaskSection: React.FC<TaskSectionProps> = ({
  handleDeleteTask,
  isGetTasksLoading,
  onError,
  tasks,
  handleTaskCheckBoxToggle,
  selectedTasks,
}) => {
  const [updateTaskModal, setUpdateTaskModal] = useState(false);

  const userAccessToken = getAccessTokenFromStorage();

  const onSuccess = () => {
    toast.success('Task has been updated successfully');
    setUpdateTaskModal(false);
  };

  const { updateTaskFormik, setFormikFieldValue } = useTaskForm({
    onError,
    onSuccess,
  });

  const handleTaskOperation = (task: Task) => {
    setUpdateTaskModal(!updateTaskModal);
    setFormikFieldValue(updateTaskFormik, 'title', task.title);
    setFormikFieldValue(updateTaskFormik, 'id', task.id);
    setFormikFieldValue(updateTaskFormik, 'description', task.description);
  };

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
          To Do's ({tasks.length >= 10 ? Math.floor(tasks.length / 10) : '0'}
          {tasks.length % 10})
        </HeadingSmall>
      )}

      {tasks.map((task) => {
        return (
          <div
            className="relative rounded-sm border border-stroke bg-white p-9 shadow-default"
            key={task.id}
          >
            <HorizontalStackLayout gap={5}>
              <div>
                <Input
                  type="checkbox"
                  error=""
                  checked={selectedTasks.includes(task.id)}
                  onChange={() => handleTaskCheckBoxToggle(task.id)}
                />
              </div>
              <div>
                <VerticalStackLayout gap={3}>
                  <HorizontalStackLayout gap={3}>
                    <div>
                      <LabelLarge>{task.title}</LabelLarge>
                    </div>
                    <div>
                      {task.sharedWith?.includes(userAccessToken.accountId) ? (
                        <Badge>Shared with you</Badge>
                      ) : null}
                    </div>
                  </HorizontalStackLayout>
                  <ParagraphSmall>{task.description}</ParagraphSmall>
                </VerticalStackLayout>
              </div>
            </HorizontalStackLayout>

            <div className="absolute right-4 top-4">
              <MenuItem>
                <Button
                  onClick={() => handleTaskOperation(task)}
                  kind={ButtonKind.SECONDARY}
                  size={ButtonSize.DEFAULT}
                  startEnhancer={
                    <img src="assets/svg/edit-icon.svg" alt="Edit task" />
                  }
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteTask(task.id)}
                  kind={ButtonKind.SECONDARY}
                  size={ButtonSize.DEFAULT}
                  startEnhancer={
                    <img src="assets/svg/delete-icon.svg" alt="Delete task" />
                  }
                >
                  Delete
                </Button>
              </MenuItem>
            </div>
          </div>
        );
      })}

      <TaskModal
        formik={updateTaskFormik}
        isModalOpen={updateTaskModal}
        setIsModalOpen={setUpdateTaskModal}
        btnText={'Update Task'}
      />
    </VerticalStackLayout>
  );
};

export default TaskSection;
