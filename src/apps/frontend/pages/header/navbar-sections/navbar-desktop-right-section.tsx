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
  userAvatarUrl: string;
}

const NavbarDesktopRightSection: React.FC<NavbarDesktopRightSectionProps> = ({
  profileMenuItems,
  userAvatarUrl,
}) => (
  <StyledNavigationList $align={ALIGN.right}>
    <StyledNavigationItem style={{ padding: '0 40px' }}>
      <ProfileMenu
        items={profileMenuItems}
        userAvatarUrl={userAvatarUrl}
      />
    </StyledNavigationItem>
  </StyledNavigationList>
);

export default NavbarDesktopRightSection;
