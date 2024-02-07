import { Button } from 'baseui/button';
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationList,
  StyledNavigationItem,
} from 'baseui/header-navigation';
import { StyledLink } from 'baseui/link';
import * as React from 'react';

interface HeaderNavbarProps {}

const HeaderNavbar: React.FC<HeaderNavbarProps> = () => (
  <HeaderNavigation>
    <StyledNavigationList $align={ALIGN.left}>
      <StyledNavigationItem>LOGO</StyledNavigationItem>
    </StyledNavigationList>
    <StyledNavigationList $align={ALIGN.center}>
      <StyledNavigationItem>
        <StyledLink href="#basic-link1">Tab Link One</StyledLink>
      </StyledNavigationItem>
      <StyledNavigationItem>
        <StyledLink href="#basic-link2">Tab Link Two</StyledLink>
      </StyledNavigationItem>
    </StyledNavigationList>
    <StyledNavigationList $align={ALIGN.right}>
      <StyledNavigationItem>
        <Button>Get started</Button>
      </StyledNavigationItem>
    </StyledNavigationList>
  </HeaderNavigation>
);

export default HeaderNavbar;
