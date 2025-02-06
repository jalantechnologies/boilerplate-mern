import React, { ReactNode, PropsWithChildren } from 'react';

interface HeadingLargeProps {
  children: ReactNode;
}

const HeadingLarge: React.FC<PropsWithChildren<HeadingLargeProps>> = ({
  children,
}) => <h2 className="text-[28px] font-semibold text-black">{children}</h2>;

export default HeadingLarge;
