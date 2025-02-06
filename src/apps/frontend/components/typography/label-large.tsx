import React, { PropsWithChildren, ReactNode } from 'react';

interface LabelLargeProps {
  children: ReactNode;
}

const LabelLarge: React.FC<PropsWithChildren<LabelLargeProps>> = ({
  children,
}) => <label className="text-lg font-medium text-black">{children}</label>;

export default LabelLarge;
