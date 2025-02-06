import React, { PropsWithChildren, ReactNode } from 'react';

interface HeadingSmallProps {
  children: ReactNode;
}

const HeadingSmall: React.FC<PropsWithChildren<HeadingSmallProps>> = ({
  children,
}) => <h3 className="text-xl font-semibold text-black">{children}</h3>;

export default HeadingSmall;
