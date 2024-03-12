import React, { useState } from 'react';

import TaskModal from './task-modal';

const TaskHeader: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-4 rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="pl-2 text-title-lg font-semibold text-black dark:text-white">
          Tasks
        </div>
      </div>
      <div className="flex flex-col gap-4 2xsm:flex-row 2xsm:items-center">
        <div>
          <button
            onClick={() => setModalOpen(!modalOpen)}
            className="flex items-center gap-2 rounded bg-primary px-4.5 py-2 font-medium text-white hover:bg-opacity-90"
          >
            <img src='assets/svg/plus-icon.svg' />
            Add task
          </button>
          <TaskModal modalOpen={modalOpen} setModalOpen={setModalOpen} btnText={'Add Task'} />
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;
