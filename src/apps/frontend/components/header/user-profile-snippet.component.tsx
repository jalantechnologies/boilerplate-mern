import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Account } from '../../types';

import styles from './header.styles';
import UserMenuDropdown from './user-menu-dropdown.component';

import { UserMenuDropdownItem } from '.';

interface DropdownUserProps {
  account: Account;
  userMenuDropdownItems: UserMenuDropdownItem[];
}

const UserProfileSnippet: React.FC<DropdownUserProps> = ({
  account,
  userMenuDropdownItems,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<HTMLAnchorElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(targetNode) ||
        trigger.current.contains(targetNode)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!dropdownOpen || key !== 'Escape') return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  return (
    <div className={styles.header.userProfileSnippet.wrapper}>
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={styles.header.userProfileSnippet.trigger}
        to="#"
      >
        <span className={styles.header.userProfileSnippet.nameBlock}>
          <span className={styles.header.userProfileSnippet.nameText}>
            {account.displayName()}
          </span>
          <span className={styles.header.userProfileSnippet.roleText}>
            User
          </span>
        </span>

        <span className={styles.header.userProfileSnippet.avatar}>
          <img src="/assets/img/user.png" alt="User" />
        </span>

        <img
          className={styles.header.userProfileSnippet.dropdownIcon}
          src="/assets/img/icon/drop-down-arrow.svg"
          alt="dropdown icon"
        />
      </Link>

      <UserMenuDropdown
        dropdownOpen={dropdownOpen}
        dropdownRef={dropdown}
        setDropdownOpen={setDropdownOpen}
        userMenuDropdownItems={userMenuDropdownItems}
      />
    </div>
  );
};

export default UserProfileSnippet;
