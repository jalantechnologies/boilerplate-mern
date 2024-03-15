import React, { PropsWithChildren } from 'react';

const HeadingLarge: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <p className="text-3xl font-semibold text-black">
    {children}
  </p>
);

export default HeadingLarge;
