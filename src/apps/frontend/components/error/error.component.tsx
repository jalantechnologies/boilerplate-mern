import React, { PropsWithChildren } from 'react';
import { Block } from 'baseui/block';

export const Error: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Block color={'negative'} marginTop="scale100" marginLeft="scale100">
      {children}
    </Block>
  );
};
