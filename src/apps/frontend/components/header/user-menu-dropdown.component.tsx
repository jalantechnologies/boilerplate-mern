import React from 'react';

type UserMenuDropdownProps = {
  dropdownOpen: boolean;
  dropdownRef: React.RefObject<HTMLDivElement>;
  logout: () => void;
  setDropdownOpen: (dropdownOpen: boolean) => void;
};

const UserMenuDropdown: React.FC<UserMenuDropdownProps> = ({
  dropdownOpen,
  dropdownRef,
  logout,
  setDropdownOpen,
}) => (
    <div
      ref={dropdownRef}
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
);

export default UserMenuDropdown;
