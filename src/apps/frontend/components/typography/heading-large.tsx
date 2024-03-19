import React, { PropsWithChildren } from 'react';

const HeadingLarge: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <h2 className="text-3xl font-semibold text-black">
    {children}
  </h2>
);

export default HeadingLarge;
