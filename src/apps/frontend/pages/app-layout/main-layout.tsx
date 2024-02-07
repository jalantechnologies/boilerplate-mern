import React, { PropsWithChildren } from 'react';

import { Grid } from '../../components';
import HeaderNavbar from '../navbar/header-navbar';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <Grid
    minHeight="100vh"
    fullHeight
  >
    <HeaderNavbar/>
    {children}
  </Grid>
);

export default MainLayout;
