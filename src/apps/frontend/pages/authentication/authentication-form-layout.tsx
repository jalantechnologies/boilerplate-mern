import React, { PropsWithChildren } from 'react';

const AuthenticationFormLayout: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <div className="flex min-h-screen flex-wrap items-center justify-center">
    {children}
  </div>
);

export default AuthenticationFormLayout;
