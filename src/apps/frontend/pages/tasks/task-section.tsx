import React, { useState } from 'react';
import toast from 'react-hot-toast';
// import CommentModal from '../comments/comment-modal';
import { useNavigate } from 'react-router-dom';
// import { MessageCircle } from "lucide-react";

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
  const navigate = useNavigate();

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

  // 🔹 Ensure only clicking the title navigates
  const handleCardClick = (taskId: string) => {
    navigate(`/tasks/${taskId}`);
  };

  if (isGetTasksLoading) {
    return (
      <div className="flex h-96 w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  console.log({ tasks });
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
          className="relative cursor-pointer rounded-sm border border-stroke bg-white p-9 shadow-default"
          key={task.id}
        >
          <VerticalStackLayout gap={3}>
            {/* 🔹 Only the title acts as a link */}
            <div
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                e.stopPropagation(); // Prevent navigation when clicking the title
                handleCardClick(task.id); // Perform navigation here
              }}
              className="cursor-pointer text-blue-600"
            >
              <LabelLarge>{task.title}</LabelLarge>
            </div>

            <ParagraphSmall>{task.description}</ParagraphSmall>
          </VerticalStackLayout>

          <div className="absolute right-4 top-4">
            <MenuItem>
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation(); // Prevent navigation when clicking button
                  handleTaskOperation(task);
                }}
                kind={ButtonKind.SECONDARY}
                size={ButtonSize.DEFAULT}
                startEnhancer={
                  <img src="assets/svg/edit-icon.svg" alt="Edit task" />
                }
              >
                Edit
              </Button>

              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation(); // Prevent navigation when clicking button
                  handleDeleteTask(task.id); // Pass task.id to delete handler
                }}
                kind={ButtonKind.SECONDARY}
                size={ButtonSize.DEFAULT}
                startEnhancer={
                  <img src="assets/svg/delete-icon.svg" alt="Delete task" />
                }
              >
                Delete
              </Button>

              {/* New Comment Button */}
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation(); // Prevent navigation when clicking button
                  handleCardClick(task.id); // Navigate to task page when clicking comment
                }}
                kind={ButtonKind.SECONDARY}
                size={ButtonSize.DEFAULT}
                startEnhancer={
                  <img
                    src="assets/svg/comment-icon.svg"
                    alt="Comment task"
                    width="16" // Match with Edit/Delete icon size
                    height="16"
                  />
                }
              >
                Comment
              </Button>
            </MenuItem>
          </div>
        </div>
      ))}

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
