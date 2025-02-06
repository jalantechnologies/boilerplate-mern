import React, { PropsWithChildren, ReactNode } from 'react';

interface ParagraphSmallProps {
  children: ReactNode;
}

const ParagraphSmall: React.FC<PropsWithChildren<ParagraphSmallProps>> = ({
  children,
}) => <p className="text-base font-medium">{children}</p>;

export default ParagraphSmall;
