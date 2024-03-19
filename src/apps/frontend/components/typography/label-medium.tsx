import React, { PropsWithChildren } from 'react';

const LabelMedium: React.FC<PropsWithChildren> = ({
  children,
}) => (
  <label className="text-base font-medium text-black">
    {children}
  </label>
);

export default LabelMedium;
