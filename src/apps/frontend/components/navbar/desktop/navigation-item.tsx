import { StyledNavigationItem } from 'baseui/header-navigation';
import * as React from 'react';
import { PropsWithChildren } from 'react';

const NavigationItem: React.FC<PropsWithChildren> = ({ children }) => <StyledNavigationItem>{children}</StyledNavigationItem>;

export default NavigationItem;
