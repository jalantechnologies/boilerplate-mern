import { StyledNavigationList, ALIGN, StyledNavigationItem } from 'baseui/header-navigation';
import { StyledLink } from 'baseui/link';
import * as React from 'react';

const NavbarDesktopCenterSection: React.FC = () => (
    <StyledNavigationList $align={ALIGN.center}>
      <StyledNavigationItem>
        <StyledLink href="/app">Dashboard</StyledLink>
      </StyledNavigationItem>
    </StyledNavigationList>
);

export default NavbarDesktopCenterSection;
