import React, { PropsWithChildren } from 'react';

interface VerticalStackLayoutProps {
  gap?: number;
}

const VerticalStackLayout: React.FC<
  PropsWithChildren<VerticalStackLayoutProps>
> = ({ children, gap = 0 }) => {
  const gapClass = gap ? `gap-${gap}` : '';
  return (
    <div className={`${gapClass} flex flex-col justify-center`}>{children}</div>
  );
};

export default VerticalStackLayout;
