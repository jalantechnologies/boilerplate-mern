import React, { PropsWithChildren } from 'react';

const HeadingMedium: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <h3 className="text-[26px] font-semibold text-black">
    {children}
  </h3>
);

export default HeadingMedium;
