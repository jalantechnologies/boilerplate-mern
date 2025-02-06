import React, { PropsWithChildren, ReactNode } from 'react';

interface AuthenticationPageLayoutProps {
  children: ReactNode;
}

const AuthenticationPageLayout: React.FC<
  PropsWithChildren<AuthenticationPageLayoutProps>
> = ({ children }) => (
  <div className="rounded-sm border border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
    {children}
  </div>
);

export default AuthenticationPageLayout;
