import React, { PropsWithChildren } from 'react';

const AuthenticationPageLayout: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <div
    className="flex min-h-screen items-center justify-center"
  >
    {children}
  </div>
);

export default AuthenticationPageLayout;
