import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import styles from './layouts.styles';

interface HorizontalStackLayoutProps {
  gap?: number;
}

const HorizontalStackLayout: React.FC<
  PropsWithChildren<HorizontalStackLayoutProps>
> = ({ children, gap = 0 }) => {
  const gapClass = gap ? `gap-${gap}` : '';
  return (
    <div className={clsx(styles.layouts.horizontalStack, gapClass)}>
      {children}
    </div>
  );
};

export default HorizontalStackLayout;
