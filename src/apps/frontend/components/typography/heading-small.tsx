import React, { PropsWithChildren } from 'react';

const HeadingSmall: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <p className="text-2xl font-semibold text-black">
    {children}
  </p>
);

export default HeadingSmall;
