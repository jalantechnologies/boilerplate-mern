import { HeaderNavigation } from 'baseui/header-navigation';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts';

import NavbarDesktopCenterSection from './navbar-sections/navbar-desktop-center-section';
import NavbarDesktopLeftSection from './navbar-sections/navbar-desktop-left-section';
import NavbarDesktopRightSection from './navbar-sections/navbar-desktop-right-section';

interface HeaderNavbarProps {}

const Header: React.FC<HeaderNavbarProps> = () => {
  const navigate = useNavigate();
  const { signOut } = useAuthContext();

  const handleSignOut = () => {
    signOut();
    navigate(0);
  };

  const profileMenuItems = [
    {
      label: 'Logout',
      onClickHandler: handleSignOut,
    },
  ];
  return (
    <HeaderNavigation>
      <NavbarDesktopLeftSection />
      <NavbarDesktopCenterSection />
      <NavbarDesktopRightSection
        profileMenuItems={profileMenuItems}
        userAvatarUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      />
    </HeaderNavigation>
  );
};
export default Header;
