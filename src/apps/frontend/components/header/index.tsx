import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import routes from '../../constants/routes';
import { useAccountContext, useAuthContext } from '../../contexts';

import HamburgerToggleButton from './hamburger-toggle-button';
import styles from './header.styles';
import UserProfileSnippet from './user-profile-snippet.component';

export type UserMenuDropdownItem = {
  iconPath: string;
  label: string;
  onClick: () => void;
};

type HeaderProps = {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
};

const Header: React.FC<HeaderProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { accountDetails } = useAccountContext();

  const handleSidebarToggle = (state: boolean) => {
    setIsSidebarOpen(state);
  };

  const handleSignOut = () => {
    logout();
    navigate(routes.LOGIN);
  };

  const userMenuDropdownItems: UserMenuDropdownItem[] = [
    {
      iconPath: '/assets/img/icon/logout.svg',
      label: 'Log Out',
      onClick: handleSignOut,
    },
  ];

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <div className={styles.headerSidebarWrapper}>
          {/* Hamburger Button for sidebar */}
          <HamburgerToggleButton
            isActive={isSidebarOpen}
            onClick={handleSidebarToggle}
          />
        </div>
        <div className={styles.headerUserProfileWrapper}>
          {/* User Area */}
          <UserProfileSnippet
            account={accountDetails}
            userMenuDropdownItems={userMenuDropdownItems}
          />
        </div>
      </div>
    </header>
  );
};
export default Header;
