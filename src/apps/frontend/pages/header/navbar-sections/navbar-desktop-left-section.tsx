import {
  StyledNavigationList,
  ALIGN,
  StyledNavigationItem,
} from 'baseui/header-navigation';
import * as React from 'react';

const NavbarDesktopLeftSection: React.FC = () => (
  <StyledNavigationList $align={ALIGN.left}>
    <StyledNavigationItem>LOGO</StyledNavigationItem>
  </StyledNavigationList>
);

export default NavbarDesktopLeftSection;
