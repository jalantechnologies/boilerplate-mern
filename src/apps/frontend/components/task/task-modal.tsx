import React, { useState } from 'react';

interface TaskModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  btnText: string;
}

const TaskModal: React.FC<TaskModalProps> = ({
  modalOpen,
  setModalOpen,
  btnText,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div
      className={`fixed left-0 top-0 z-99999 flex h-screen w-full justify-center overflow-y-scroll bg-black/80 px-4 py-5 ${
        modalOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="relative m-auto w-full max-w-180 rounded-sm border border-stroke bg-gray p-4 shadow-default dark:border-strokedark dark:bg-meta-4 sm:p-8 xl:p-10">
        <button
          onClick={() => setModalOpen(false)}
          className="absolute right-1 top-1 sm:right-5 sm:top-5"
        >
          <img src="assets/svg/close-icon.svg" className="fill-current" />
        </button>

        <div className="my-5">
          <div className="mb-2.5 block font-medium text-black dark:text-white">
            {title}
          </div>
          <input
            type="text"
            placeholder="Enter task title"
            className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
        </div>

        <div className="mb-5">
          <div className="mb-2.5 block font-medium text-black dark:text-white">
            {description}
          </div>
          <textarea
            cols={30}
            rows={7}
            placeholder="Enter task description"
            className="w-full rounded-sm border border-stroke bg-white px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:focus:border-primary"
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <button className="flex w-full items-center justify-center gap-2 rounded bg-primary px-4.5 py-2.5 font-medium text-white hover:bg-opacity-90">
          <img src="assets/svg/plus-icon.svg" />
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
