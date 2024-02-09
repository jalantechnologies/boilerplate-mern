import { FlexGridItem } from 'baseui/flex-grid';
import React, { PropsWithChildren } from 'react';

import { Grid } from '../../components';
import Header from '../header/header';

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => (
  <Grid fullHeight>
    <FlexGridItem>
      <Header />
    </FlexGridItem>
    <FlexGridItem>{children}</FlexGridItem>
  </Grid>
);

export default AppLayout;
