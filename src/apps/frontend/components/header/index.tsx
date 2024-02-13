import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts';

import DropdownUser from './dropdown-user.component';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
      <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
        <div className="flex grow items-center justify-end p-4 shadow-2 md:px-6 2xl:px-11">
          <div className="flex items-center gap-3 2xsm:gap-7">
            {/* <!-- User Area --> */}
            <DropdownUser logout={handleSignOut} />
            {/* <!-- User Area --> */}
          </div>
        </div>
      </header>
  );
};
export default Header;
