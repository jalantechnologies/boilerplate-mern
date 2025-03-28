import clsx from 'clsx';
import styles from 'frontend/components/flex/flex.styles';
import React, { PropsWithChildren } from 'react';

interface FlexProps {
  alignItems?: string;
  direction?: string;
  flexWrap?: string;
  gap?: number;
  justifyContent?: string;
}

const Flex: React.FC<PropsWithChildren<FlexProps>> = ({
  alignItems = 'start',
  children,
  direction = 'row',
  flexWrap = 'nowrap',
  gap = '0',
  justifyContent = 'start',
}) => (
  <div
    className={clsx([
      styles.flex,
      styles.direction[direction],
      styles.justifyContent[justifyContent],
      styles.alignItems[alignItems],
      styles.flexWrap[flexWrap],
      styles.gap[gap],
    ])}
  >
    {children}
  </div>
);

export default Flex;
