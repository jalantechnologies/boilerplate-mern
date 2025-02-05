import React, { PropsWithChildren } from 'react';

const ParagraphSmall: React.FC<PropsWithChildren> = ({ children }) => (
  <p className="max-h-[80px] max-w-[800px] overflow-y-auto text-base font-medium">
    {children}
  </p>
);

export default ParagraphSmall;
