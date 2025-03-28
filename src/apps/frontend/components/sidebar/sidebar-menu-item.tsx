import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './sidebar.styles';

type SidebarMenuItemProps = {
  iconPath: string;
  path: string;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  subItems?: { path: string; title: string }[];
  title: string;
};

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({
  iconPath,
  path,
  setIsSidebarOpen,
  subItems,
  title,
}) => {
  const location = useLocation();
  const { pathname } = location;
  const [open, setOpen] = useState<boolean>(pathname.includes(path));

  const handleClick = () => {
    setOpen(!open);
  };

  const isTopLevelActive =
    pathname === path || pathname.includes(title.toLowerCase());

  return (
    <li>
      <NavLink
        to={subItems ? '#' : path}
        className={`${styles.sidebar.menuItem.link} ${
          isTopLevelActive ? styles.sidebar.menuItem.linkActive : ''
        }`}
        onClick={() => {
          if (subItems) {
            handleClick();
            return;
          }
          setIsSidebarOpen(false);
        }}
      >
        <img src={iconPath} alt={`${title} icon`} />
        {title}
        {subItems && (
          <img
            src={
              open
                ? '/assets/img/icon/chevron-up-solid.svg'
                : '/assets/img/icon/chevron-down-solid.svg'
            }
            alt="chevron icon"
            className="absolute right-4"
          />
        )}
      </NavLink>
      {subItems && open && (
        <div className={styles.sidebar.menuItem.subMenuWrapper}>
          <ul className={styles.sidebar.menuItem.subMenuList}>
            {subItems.map((subItem) => (
              <li key={subItem.path}>
                <NavLink
                  to={subItem.path}
                  className={({ isActive }) =>
                    `${styles.sidebar.menuItem.subMenuItem} ${
                      isActive ? styles.sidebar.menuItem.subMenuItemActive : ''
                    }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  {subItem.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default SidebarMenuItem;
