import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

interface FlexProps {
  alignItems?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  direction?: 'row' | 'col';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  gap?:
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 14
    | 16
    | 20
    | 24
    | 28
    | 32
    | 36
    | 40
    | 44
    | 48
    | 52
    | 56
    | 60
    | 64
    | 72
    | 80
    | 96;
  justifyContent?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  className?: string;
}

const alignItemsClasses = {
  start: 'items-start',
  end: 'items-end',
  center: 'items-center',
  baseline: 'items-baseline',
  stretch: 'items-stretch',
};

const directionClasses = {
  row: 'flex-row',
  col: 'flex-col',
};

const justifyContentClasses = {
  start: 'justify-start',
  end: 'justify-end',
  center: 'justify-center',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const flexWrapClasses = {
  nowrap: 'flex-nowrap',
  wrap: 'flex-wrap',
  'wrap-reverse': 'flex-wrap-reverse',
};

const gapClasses = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  7: 'gap-7',
  8: 'gap-8',
  9: 'gap-9',
  10: 'gap-10',
  11: 'gap-11',
  12: 'gap-12',
  14: 'gap-14',
  16: 'gap-16',
  20: 'gap-20',
  24: 'gap-24',
  28: 'gap-28',
  32: 'gap-32',
  36: 'gap-36',
  40: 'gap-40',
  44: 'gap-44',
  48: 'gap-48',
  52: 'gap-52',
  56: 'gap-56',
  60: 'gap-60',
  64: 'gap-64',
  72: 'gap-72',
  80: 'gap-80',
  96: 'gap-96',
};

const Flex: React.FC<PropsWithChildren<FlexProps>> = ({
  alignItems,
  children,
  direction,
  flexWrap,
  gap,
  justifyContent,
  className,
}) => (
  <div
    className={clsx(
      'flex',
      direction && directionClasses[direction],
      justifyContent && justifyContentClasses[justifyContent],
      alignItems && alignItemsClasses[alignItems],
      flexWrap && flexWrapClasses[flexWrap],
      gap !== undefined && gapClasses[gap],
      className
    )}
  >
    {children}
  </div>
);

export default Flex;
