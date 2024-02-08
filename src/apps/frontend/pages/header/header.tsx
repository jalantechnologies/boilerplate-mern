import { HeaderNavigation } from 'baseui/header-navigation';
import * as React from 'react';

import NavbarDesktopCenterSection from './navbar-sections/navbar-desktop-center-section';
import NavbarDesktopLeftSection from './navbar-sections/navbar-desktop-left-section';
import NavbarDesktopRightSection from './navbar-sections/navbar-desktop-right-section';

interface HeaderNavbarProps {}

const Header: React.FC<HeaderNavbarProps> = () => {
  const profileMenuItems = [
    {
      label: 'Profile',
      onClickHandler: () => console.log('Profile Clicked'),
    },
    {
      label: 'Settings',
      onClickHandler: () => console.log('Settings Clicked'),
    },
    {
      label: 'Logout',
      onClickHandler: () => console.log('Logout Clicked'),
    },
  ];
  return (
    <HeaderNavigation>
      <NavbarDesktopLeftSection />
      <NavbarDesktopCenterSection />
      <NavbarDesktopRightSection
        profileMenuItems={profileMenuItems}
        userName={'Jhon'}
        userAvatarUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      />
    </HeaderNavigation>
  );
};
export default Header;
