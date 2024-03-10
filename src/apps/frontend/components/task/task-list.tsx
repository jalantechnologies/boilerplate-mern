import React from 'react';

import Breadcrumb from '../breadcrumb/breadcrumb';
import DropdownDefault from '../dropdowns/dropdown-default';

import TaskHeader from './task-header';

const TaskList: React.FC = () => (
  <div className="p-5 sm:p-10">
    <Breadcrumb pageName="Task List" />
    <TaskHeader />
    <div className="mt-9 flex flex-col gap-9">
      <div className=" flex flex-col gap-5.5">
        <div className="text-xl font-semibold text-black dark:text-white">
          To Do's
        </div>

        <div className="relative flex cursor-move justify-between rounded-sm border border-stroke bg-white p-7 shadow-default dark:border-strokedark dark:bg-boxdark">
          <div>
            <div className="mb-4 text-lg font-medium text-black dark:text-white">
              Task title
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="taskCheckbox1" className="cursor-pointer">
                <div className="relative flex items-center pt-0.5">
                  <input
                    type="checkbox"
                    id="taskCheckbox1"
                    className="taskCheckbox sr-only"
                  />
                  <div className="box mr-3 flex size-5 items-center justify-center rounded border border-stroke dark:border-strokedark dark:bg-boxdark-2">
                    <span className="text-white opacity-0">
                      <img src="/assets/svg/checkmark.svg" />
                    </span>
                  </div>
                  <p>Here is task one</p>
                </div>
              </label>
            </div>
          </div>
          <div className="absolute right-4 top-4">
            <DropdownDefault />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default TaskList;
