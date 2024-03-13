import React, { PropsWithChildren } from 'react';

interface FlexItemProps {
  className?: string;
}

const FlexItem: React.FC<PropsWithChildren<FlexItemProps>> = ({
  children,
  className,
}) => (
    <div className={className}>
      {children}
    </div>
);

export default FlexItem;
