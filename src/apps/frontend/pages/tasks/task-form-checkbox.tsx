import React from 'react';

interface TaskFormCheckboxProps {
  id: string;
  className: string;
}

const TaskFormCheckbox: React.FC<TaskFormCheckboxProps> = ({
  id,
  className,
}) => (
  <>
    <input type="checkbox" id={id} className={className} />
    <div className="box flex size-5 items-center justify-center rounded border border-stroke">
      <span className="text-white opacity-0">
        <img src="assets/img/icon/form-checkbox-checkmark.svg" alt="checkbox tick mark icon" />
      </span>
    </div>
  </>
);

export default TaskFormCheckbox;
