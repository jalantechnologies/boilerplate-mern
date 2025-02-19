import React, { PropsWithChildren, ReactNode } from 'react';

interface HeadingMediumProps {
  children: ReactNode;
}

const HeadingMedium: React.FC<PropsWithChildren<HeadingMediumProps>> = ({
  children,
}) => <h3 className="text-[26px] font-semibold text-black">{children}</h3>;

export default HeadingMedium;
