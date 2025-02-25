import React, { PropsWithChildren } from 'react';

interface HorizontalStackLayoutProps {
  gap?: number;
}

const HorizontalStackLayout: React.FC<
  PropsWithChildren<HorizontalStackLayoutProps>
> = ({ children, gap = 0 }) => {
  const gapClass = gap ? `gap-${gap}` : '';
  return <div className={`${gapClass} flex items-center`}>{children}</div>;
};

export default HorizontalStackLayout;
