import React, { PropsWithChildren } from 'react';

interface ParagraphMediumProps {
  children: React.ReactNode;
}

const ParagraphMedium: React.FC<PropsWithChildren<ParagraphMediumProps>> = ({
  children,
}) => <p className="text-xl font-medium">{children}</p>;

export default ParagraphMedium;
