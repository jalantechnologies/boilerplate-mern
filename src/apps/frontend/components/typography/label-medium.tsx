import React, { PropsWithChildren } from 'react';

const LabelMedium: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <p className="text-base font-medium text-black">
    {children}
  </p>
);

export default LabelMedium;
