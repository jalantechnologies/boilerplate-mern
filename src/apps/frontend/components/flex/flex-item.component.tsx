import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

interface FlexItemProps {
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  flex?:
    | '1'
    | 'auto'
    | 'initial'
    | 'none'
    | 'grow'
    | 'grow-0'
    | 'shrink'
    | 'shrink-0';
  justifySelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch';
  order?:
    | 'first'
    | 'last'
    | 'none'
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
    | 12;
  className?: string;
}

const alignSelfClasses = {
  auto: 'self-auto',
  start: 'self-start',
  end: 'self-end',
  center: 'self-center',
  baseline: 'self-baseline',
  stretch: 'self-stretch',
};

const flexClasses = {
  '1': 'flex-1',
  auto: 'flex-auto',
  initial: 'flex-initial',
  none: 'flex-none',
  grow: 'grow',
  'grow-0': 'grow-0',
  shrink: 'shrink',
  'shrink-0': 'shrink-0',
};

const justifySelfClasses = {
  auto: 'justify-self-auto',
  start: 'justify-self-start',
  end: 'justify-self-end',
  center: 'justify-self-center',
  stretch: 'justify-self-stretch',
};

const orderClasses = {
  first: 'order-first',
  last: 'order-last',
  none: 'order-none',
  1: 'order-1',
  2: 'order-2',
  3: 'order-3',
  4: 'order-4',
  5: 'order-5',
  6: 'order-6',
  7: 'order-7',
  8: 'order-8',
  9: 'order-9',
  10: 'order-10',
  11: 'order-11',
  12: 'order-12',
};

const FlexItem: React.FC<PropsWithChildren<FlexItemProps>> = ({
  alignSelf,
  children,
  flex,
  justifySelf,
  order,
  className,
}) => (
  <div
    className={clsx(
      alignSelf && alignSelfClasses[alignSelf],
      flex && flexClasses[flex],
      justifySelf && justifySelfClasses[justifySelf],
      order && orderClasses[order],
      className
    )}
  >
    {children}
  </div>
);

export default FlexItem;
