import React, { useRef } from 'react';

import routes from '../../constants/routes';

import SidebarMenuItem from './sidebar-menu-item';
import styles from './sidebar.styles';

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
      className={`${styles.sidebar.container} ${
        isSidebarOpen ? styles.sidebar.visible : styles.sidebar.hidden
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className={styles.sidebar.header}>
        <button
          ref={trigger}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={isSidebarOpen}
          className={styles.sidebar.toggleButton}
        >
          <img src="/assets/img/icon/sidebar-arrow-icon.svg" alt="arrow icon" />
        </button>
      </div>

      {/* <!-- SIDEBAR MENU --> */}
      <div className={styles.sidebar.scrollArea}>
        <nav className={styles.sidebar.navWrapper}>
          <h3 className={styles.sidebar.sectionHeading}>MENU</h3>
          <ul className={styles.sidebar.menuList}>
            <SidebarMenuItem
              iconPath="/assets/img/icon/dashboard-sidebar-icon.svg"
              path={routes.DASHBOARD}
              setIsSidebarOpen={setIsSidebarOpen}
              title="Dashboard"
            />
            <SidebarMenuItem
              iconPath="/assets/img/icon/tasks-sidebar-icon.svg"
              path={routes.TASKS}
              setIsSidebarOpen={setIsSidebarOpen}
              title="Tasks"
            />
            <SidebarMenuItem
              iconPath="/assets/img/icon/profile-sidebar-icon.svg"
              path={routes.PROFILE}
              setIsSidebarOpen={setIsSidebarOpen}
              title="Profile"
              subItems={[
                {
                  path: routes.PROFILE_SETTINGS,
                  title: 'Settings',
                },
              ]}
            />
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
