import * as React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import constants from '../../constants/routes';
import { useAuthContext } from '../../contexts';

import DropdownUser from './dropdown-user.component';

const Header: React.FC = () => {
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
        <div className="hidden sm:block">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <li>
              <Link to={constants.DASHBOARD}> Home </Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* <!-- User Area --> */}
          <DropdownUser logout={handleSignOut} account={accountResult} />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};
export default Header;
