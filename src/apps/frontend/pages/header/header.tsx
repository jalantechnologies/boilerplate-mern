import { Block } from 'baseui/block';
import { HeaderNavigation } from 'baseui/header-navigation';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../../contexts';

import NavbarRightSection from './navbar-sections/navbar-right-section';

interface HeaderNavbarProps {}

const Header: React.FC<HeaderNavbarProps> = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const profileMenuItems = [
    {
      label: 'Logout',
      onClickHandler: handleSignOut,
    },
  ];
  return (
    <Block display={'flex'} justifyContent={'end'} paddingRight={'scale1000'}>
        <HeaderNavigation>
          <NavbarRightSection
            profileMenuItems={profileMenuItems}
            userName="User"
          />
        </HeaderNavigation>
    </Block>
  );
};
export default Header;
