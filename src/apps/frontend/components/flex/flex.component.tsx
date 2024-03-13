import React from 'react';
import clsx from 'clsx';
import styles from './flex.styles';

interface FlexProps {
  children: React.ReactNode;
  direction?: string;
  justifyContent?: string;
  alignItems?: string;
  flexWrap?: string;
  gap?: number;
}

const Flex: React.FC<FlexProps> = ({
  alignItems = 'start',
  children,
  direction = 'row',
  flexWrap = 'nowrap',
  gap = '0',
  justifyContent = 'start',
}) => {
  return (
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
}

export default Flex;
