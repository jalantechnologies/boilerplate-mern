import clsx from 'clsx';
import React from 'react';

import styles from './header.styles';

import { UserMenuDropdownItem } from '.';

type UserMenuDropdownProps = {
  dropdownOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  setDropdownOpen: (dropdownOpen: boolean) => void;
  userMenuDropdownItems: UserMenuDropdownItem[];
};

const UserMenuDropdown: React.FC<UserMenuDropdownProps> = ({
  dropdownOpen,
  dropdownRef,
  setDropdownOpen,
  userMenuDropdownItems,
}) => (
  <div
    ref={dropdownRef}
    onFocus={() => setDropdownOpen(true)}
    onBlur={() => setDropdownOpen(false)}
    className={clsx(
      styles.header.userMenuDropdown.wrapper,
      dropdownOpen
        ? styles.header.userMenuDropdown.visible
        : styles.header.userMenuDropdown.hidden
    )}
  >
    {userMenuDropdownItems.map((item, index) => (
      <button
        key={index}
        className={styles.header.userMenuDropdown.item}
        onClick={item.onClick}
      >
        <img
          className={styles.header.userMenuDropdown.icon}
          src={item.iconPath}
          alt="logout icon"
        />
        {item.label}
      </button>
    ))}
  </div>
);

export default UserMenuDropdown;
