import { Block } from 'baseui/block';
import React, { PropsWithChildren } from 'react';

const AuthenticationFormLayout: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <Block width={['95%', '300px', '300px', '300px']}>
    {children}
  </Block>
);

export default AuthenticationFormLayout;
