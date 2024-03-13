import React, { ReactNode } from "react";

interface FlexItemProps {
  children: ReactNode;
  className?: string;
}

const FlexItem: React.FC<FlexItemProps> = ({
  children,
  className,
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default FlexItem;
