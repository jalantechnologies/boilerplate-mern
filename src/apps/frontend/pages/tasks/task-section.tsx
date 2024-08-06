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
import { Task } from '../../types/task';

import TaskModal from './task-modal';
import useTaskForm from './tasks-form.hook';
import CommentList from '../comments/comments';
import AddComment from '../comments/new-comment';
import ShareTaskModal from './task-share-modal';

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
  const [shareTaskModal, setShareTaskModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

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

  const handleShareTask = (task: Task) => {
    setSelectedTask(task);
    setShareTaskModal(true);
  };

  const toggleComments = (taskId: string) => {
    setSelectedTaskId(selectedTaskId === taskId ? null : taskId);
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
              <Button
                onClick={() => handleShareTask(task)}
                kind={ButtonKind.SECONDARY}
                size={ButtonSize.DEFAULT}
                startEnhancer={
                  <img src="assets/svg/share-icon.svg" alt="Share task" />
                }
              >
                Share
              </Button>
<<<<<<< HEAD
            </MenuItem>
          </div>
          <div className="w-50 my-3 px-2 py-1 bg-blue-500  rounded d-flex justify-content-center align-items-center ">
            <Button
              onClick={() => toggleComments(task.id)}
              kind={ButtonKind.SECONDARY}
              size={ButtonSize.DEFAULT}
            >
              <div className='text-white'>
              {selectedTaskId === task.id ? 'Hide Comments' : 'Show Comments'}
              </div>
            </Button>
          </div>
=======
              <Button
                onClick={() => toggleComments(task.id)}
                kind={ButtonKind.SECONDARY}
                size={ButtonSize.DEFAULT}
              >
                {selectedTaskId === task.id ? 'Hide Comments' : 'Comments'}
              </Button>
            </MenuItem>
          </div>
>>>>>>> 09e6ecb626c02d7c8caec3ecdfe0c0c0be1e2e4c

          {selectedTaskId === task.id && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <CommentList taskId={task.id} />
              <AddComment taskId={task.id} />
            </div>
          )}
        </div>
      ))}

      <TaskModal
        formik={updateTaskFormik}
        isModalOpen={updateTaskModal}
        setIsModalOpen={setUpdateTaskModal}
        btnText={'Update Task'}
      />
      <ShareTaskModal
        task={selectedTask}
        isModalOpen={shareTaskModal}
        setIsModalOpen={setShareTaskModal}
      />
    </VerticalStackLayout>
  );
};

export default TaskSection;