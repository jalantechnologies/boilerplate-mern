import React, { PropsWithChildren } from 'react';

const AuthenticationFormLayout: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <div className="flex min-h-screen flex-wrap items-center justify-center p-4 md:p-6 2xl:p-10">
    <div className="w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark md:w-2/3 xl:w-1/3">
      {children}
    </div>
  </div>
);

export default AuthenticationFormLayout;
