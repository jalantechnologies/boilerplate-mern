import {
  StyledNavigationList,
  ALIGN,
  StyledNavigationItem,
} from 'baseui/header-navigation';
import * as React from 'react';

import ProfileMenu from '../profile-menu/profile-menu';
import { ProfileMenuItem } from '../types';

interface NavbarRightSectionProps {
  profileMenuItems: ProfileMenuItem[];
  userName: string;
}

const NavbarRightSection: React.FC<NavbarRightSectionProps> = ({
  profileMenuItems,
  userName,
}) => (
  <StyledNavigationList $align={ALIGN.right}>
    <StyledNavigationItem style={{ padding: 'scale1000' }}>
      <ProfileMenu items={profileMenuItems} userName={userName} />
    </StyledNavigationItem>
  </StyledNavigationList>
);

export default NavbarRightSection;
