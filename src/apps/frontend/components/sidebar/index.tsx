import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';

import SidebarMenuItem from './sidebar-menu-item';
import constants from '../../constants/routes';

type SidebarProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img
            className='size-13'
            src='/assets/img/logo-small.jpg'
            alt="Logo"
          />
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={isSidebarOpen}
          className="block lg:hidden"
        >
          <img src='/assets/img/icon/sidebar-arrow-icon.svg' alt="arrow icon" />
        </button>
      </div>

      {/* <!-- SIDEBAR MENU --> */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="p-2 lg:px-6">
          <h3 className="mb-2 ml-4 text-sm font-semibold text-bodydark2">
            MENU
          </h3>
          <ul className="mb-6 ml-6 flex flex-col gap-1.5">
            <SidebarMenuItem
              path={constants.DASHBOARD}
              title='Dashboard'
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <SidebarMenuItem
              path={constants.TASKS}
              title='Tasks'
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
