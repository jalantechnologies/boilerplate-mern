import React, { PropsWithChildren } from 'react';

const HeadingSmall: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <h3 className="text-2xl font-semibold text-black">
    {children}
  </h3>
);

export default HeadingSmall;
