import React, { useState } from 'react';

import TaskModal from '../task/task-modal';

const EllipsisMenu: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="relative flex">
      <button
        className="text-[#98A6AD] hover:text-body"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <img src="assets/svg/more-alt.svg" />
      </button>
      <div
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 top-full z-40 w-40 space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? 'block' : 'hidden'
        }`}
      >
        <button
          onClick={() => setModalOpen(!modalOpen)}
          className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4"
        >
          <img src="assets/svg/edit-icon.svg" />
          Edit
        </button>
        <button className="flex w-full items-center gap-2 rounded-sm px-4 py-1.5 text-left text-sm hover:bg-gray dark:hover:bg-meta-4">
          <img src="assets/svg/delete-icon.svg" />
          Delete
        </button>
      </div>
      <TaskModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        btnText={'Update Task'}
      />
    </div>
  );
};

export default EllipsisMenu;
