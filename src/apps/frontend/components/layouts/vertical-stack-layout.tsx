import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

import styles from './layouts.styles';

interface VerticalStackLayoutProps {
  gap?: number;
}

const VerticalStackLayout: React.FC<
  PropsWithChildren<VerticalStackLayoutProps>
> = ({ children, gap = 0 }) => {
  const gapClass = gap ? `gap-${gap}` : '';
  return (
    <div className={clsx(styles.layouts.verticalStack, gapClass)}>
      {children}
    </div>
  );
};

export default VerticalStackLayout;
