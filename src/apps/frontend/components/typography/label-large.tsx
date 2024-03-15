import React, { PropsWithChildren } from 'react';

const LabelLarge: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <p className="text-lg font-medium text-black">
    {children}
  </p>
);

export default LabelLarge;
