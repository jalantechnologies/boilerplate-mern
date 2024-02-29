import * as React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts';

import HamburgerToggleButton from './hamburger-toggle-button';
import DropdownUser from './user-profile-snippet.component';

type HeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const navigate = useNavigate();
  const { accountResult, getAccountDetails, logout } = useAuthContext();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAccountDetails();
  }, [getAccountDetails]);

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex grow items-center justify-between p-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-4 lg:hidden">
          <HamburgerToggleButton
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          <Link className="block shrink-0 lg:hidden" to="/">
            <img
              className='size-13'
              src='/assets/img/logo-small.jpg'
              alt="Logo"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end gap-3 2xsm:gap-7">
          {/* <!-- User Area --> */}
          <DropdownUser logout={handleSignOut} account={accountResult} />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};
export default Header;
