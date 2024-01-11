import { FlexGrid, FlexGridProps } from 'baseui/flex-grid';
import React, { PropsWithChildren } from 'react';

export type GridProps = FlexGridProps & {
  fullHeight?: boolean;
};

export const Grid: React.FC<PropsWithChildren<GridProps>> = ({
  children,
  fullHeight = false,
  ...props
}) => (
  <FlexGrid
    overrides={{
      Block: {
        style: {
          flex: '1 1 0',
          height: fullHeight ? '100%' : 'auto',
        },
      },
    }}
    {...props}
  >
    {children}
  </FlexGrid>
);

export default Grid;
