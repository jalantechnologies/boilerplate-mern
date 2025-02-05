import React, { useState, useEffect } from 'react';
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
import { Comment } from '../../types/comment';

import TaskModal from './task-modal';
import useTaskForm from './tasks-form.hook';
import CommentService from '../../services/comment.service';

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
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const commentService = new CommentService();

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

  const fetchComments = async (taskId: string) => {
    try {
      const response = await commentService.getComments(taskId);
      setComments(response.data);
      setSelectedTaskId(taskId);
    } catch (error) {
      onError && onError(error as AsyncError);
    }
  };

  const handleEditComment = async (commentId: string, content: string) => {
    try {
      await commentService.updateComment(commentId, content);
      fetchComments(selectedTaskId!);
    } catch (error) {
      onError && onError(error as AsyncError);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await commentService.deleteComment(commentId);
      fetchComments(selectedTaskId!);
    } catch (error) {
      onError && onError(error as AsyncError);
    }
  };

  useEffect(() => {
    if (selectedTaskId) {
      fetchComments(selectedTaskId);
    }
  }, [selectedTaskId]);

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
            <Button
              onClick={() => fetchComments(task.id)}
              kind={ButtonKind.SECONDARY}
              size={ButtonSize.DEFAULT}
            >
              View Comments
            </Button>
            {selectedTaskId === task.id && (
              <div>
                {comments.map((comment) => (
                  <div key={comment._id}>
                    <ParagraphSmall>{comment.content}</ParagraphSmall>
                    <Button
                      onClick={() => handleEditComment(comment._id, comment.content)}
                      kind={ButtonKind.SECONDARY}
                      size={ButtonSize.DEFAULT}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteComment(comment._id)}
                      kind={ButtonKind.SECONDARY}
                      size={ButtonSize.DEFAULT}
                    >
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            )}
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