import React, { PropsWithChildren } from 'react';

const H2: React.FC<PropsWithChildren> = ({ children }) => (
  <h2 className="text-2xl font-bold text-black sm:text-[33px] sm:leading-[45px]">
    {children}
  </h2>
);

export default H2;
