import React, { PropsWithChildren, ReactNode } from 'react';

interface H2Props {
  children: ReactNode;
}

const H2: React.FC<PropsWithChildren<H2Props>> = ({ children }) => (
  <h2 className="text-2xl font-bold text-black sm:text-title-xl2">
    {children}
  </h2>
);

export default H2;
