import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { Account } from '../../types';

interface DropdownUserProps {
  account: Account;
  logout: () => void;
}

const DropdownUser: React.FC<DropdownUserProps> = ({ account, logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<HTMLAnchorElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  const username = account?.name || account?.username || 'Guest';

  // close on click outside
  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      const targetNode = event.target as Node;
      if (!dropdown.current) return;
      if (
        !dropdownOpen
        || dropdown.current.contains(targetNode)
        || trigger.current.contains(targetNode)
      ) return;
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
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {username}
          </span>
          <span className="block text-xs">User</span>
        </span>

        <span className="size-12 rounded-full">
          <img src="/assets/img/user.png" alt="User" />
        </span>

        <img
          className="hidden fill-current opacity-50 sm:block"
          src="/assets/img/icon/drop-down-arrow.svg"
          alt="dropdown icon"
        />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
        <button
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          onClick={logout}
        >
          <img
            className="hidden fill-current opacity-50 sm:block"
            src="/assets/img/icon/logout.svg"
            alt="logout icon"
          />
          Log Out
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
