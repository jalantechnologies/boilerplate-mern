import React, { useState } from 'react';
import toast from 'react-hot-toast';

import Button from '../../components/button';
import MenuItem from '../../components/menu';
import Spinner from '../../components/spinner/spinner';
import HeadingSmall from '../../components/typography/heading-small';
import LabelLarge from '../../components/typography/label-large';
import ParagraphSmall from '../../components/typography/paragraph-small';
import { ButtonKind, ButtonSize } from '../../types/button';
import { Task, TaskOperationType } from '../../types/task';

import TaskModal from './task-modal';
import useTaskForm from './tasks-form.hook';

interface TaskSectionProps {
  tasks: Task[];
  handleDeleteTask: (taskId: string) => void;
  isGetTasksLoading: boolean;
}

const TaskSection: React.FC<TaskSectionProps> = ({
  tasks,
  handleDeleteTask,
  isGetTasksLoading,
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
    <div className="pt-5">
      {tasks.length > 0 && (
        <div className="pb-5">
          <HeadingSmall>To Do's ({tasks.length})</HeadingSmall>
        </div>
      )}

      {tasks.map((task) => (
        <div
          key={task.id}
          className="relative mt-5 flex cursor-move justify-between rounded-sm border border-stroke bg-white p-7 shadow-default"
        >
          <div>
            <LabelLarge>{task.title}</LabelLarge>
            <div className="flex flex-col gap-2">
              <label
                htmlFor={`taskCheckbox${task.id}`}
                className="cursor-pointer"
              >
                <div className="relative flex items-center gap-2 pt-4">
                  <input
                    type="checkbox"
                    id={`taskCheckbox${task.id}`}
                    className="taskCheckbox sr-only"
                  />
                  <div className="box flex size-5 items-center justify-center rounded border border-stroke">
                    <span className="text-white opacity-0">
                      <img src="assets/svg/checkbox-icon.svg" />
                    </span>
                  </div>
                  <ParagraphSmall>{task.description}</ParagraphSmall>
                </div>
              </label>
            </div>
          </div>
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
    </div>
  );
};

export default TaskSection;
