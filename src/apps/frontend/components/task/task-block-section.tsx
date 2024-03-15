import React, { useState } from 'react';
import toast from 'react-hot-toast';

import useTaskForm from '../../pages/tasks/tasks-form.hook';
import { Task } from '../../types/task';
import Button from '../button/button.component';
import MenuItem from '../menu';
import HeadingSmall from '../typography/heading-small';
import LabelLarge from '../typography/label-large';
import LabelMedium from '../typography/label-medium';

import TaskModal from './task-modal';

interface TaskBlockSectionProps {
  tasks: Task[];
  handleDeleteTask: (taskId: string) => void;
}

const TaskBlockSection: React.FC<TaskBlockSectionProps> = ({
  tasks,
  handleDeleteTask,
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

  return (
    <div className="pt-5">
      {tasks.length > 0 && (
        <HeadingSmall>To Do's ({tasks.length})</HeadingSmall>
      )}

      {tasks.map((task) => (
        <div
          key={task.id}
          className="relative mt-3 flex cursor-move justify-between rounded-sm border border-stroke bg-white p-7 shadow-default"
        >
          <div>
            <LabelLarge>{task.title}</LabelLarge>
            <div className="flex flex-col gap-2">
              <label
                htmlFor={`taskCheckbox${task.id}`}
                className="cursor-pointer"
              >
                <div className="relative mt-4 flex items-center">
                  <input
                    type="checkbox"
                    id={`taskCheckbox${task.id}`}
                    className="taskCheckbox sr-only"
                  />
                  <div className="box mr-3 flex size-5 items-center justify-center rounded border border-stroke">
                    <span className="text-white opacity-0">
                      <img src="assets/svg/checkbox-icon.svg" />
                    </span>
                  </div>
                  <LabelMedium>{task.description}</LabelMedium>
                </div>
              </label>
            </div>
          </div>
          <div className="absolute right-4 top-4">
            <MenuItem>
              <Button
                onClick={() => handleTaskOperation(task)}
                kind="secondary"
              >
                <img src="assets/svg/edit-icon.svg" alt="Edit task" />
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteTask(task.id)}
                kind="secondary"
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
        taskOperationType={'edit'}
        task={currentTask}
      />
    </div>
  );
};

export default TaskBlockSection;
