import React, { PropsWithChildren } from 'react';

const AuthenticationFormLayout: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <div className="flex min-h-screen flex-wrap items-center justify-center">
    <div className="w-full p-4 sm:p-12.5 md:w-1/2 xl:w-1/3 xl:p-17.5">
      {children}
    </div>
  </div>
);

export default AuthenticationFormLayout;
