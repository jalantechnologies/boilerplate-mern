import {
  StyledNavigationList,
  ALIGN,
  StyledNavigationItem,
} from 'baseui/header-navigation';
import * as React from 'react';

import ProfileMenu from '../profile-menu/profile-menu';
import { ProfileMenuItem } from '../types';

interface NavbarDesktopRightSectionProps {
  profileMenuItems: ProfileMenuItem[];
  userName: string;
  userAvatarUrl: string;
}

const NavbarDesktopRightSection: React.FC<NavbarDesktopRightSectionProps> = ({
  profileMenuItems,
  userAvatarUrl,
  userName,
}) => (
  <StyledNavigationList $align={ALIGN.right}>
    <StyledNavigationItem style={{ padding: '0 40px' }}>
      <ProfileMenu
        items={profileMenuItems}
        userName={userName}
        userAvatarUrl={userAvatarUrl}
      />
    </StyledNavigationItem>
  </StyledNavigationList>
);

export default NavbarDesktopRightSection;
