import React, { PropsWithChildren } from 'react';

import { Grid } from '../../components';

const AuthenticationPageLayout: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <Grid
    justifyContent={'center'}
    alignItems={'center'}
    minHeight="100vh"
    fullHeight
  >
    {children}
  </Grid>
);

export default AuthenticationPageLayout;
