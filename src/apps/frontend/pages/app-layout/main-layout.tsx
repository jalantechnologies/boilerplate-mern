import { FlexGridItem } from 'baseui/flex-grid';
import React, { PropsWithChildren } from 'react';

import { Grid } from '../../components';
import Header from '../header/header';

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <Grid minHeight="100vh" fullHeight justifyContent={'space-between'}>
    <FlexGridItem>
      <Header />
    </FlexGridItem>
    {children}
  </Grid>
);

export default MainLayout;
