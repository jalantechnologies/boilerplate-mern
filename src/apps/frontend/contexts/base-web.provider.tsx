import { createTheme, BaseProvider } from 'baseui';
import React, { PropsWithChildren } from 'react';
import { Client as Styletron } from 'styletron-engine-monolithic';
import { Provider as StyletronProvider } from 'styletron-react';

import { primitives, overrides } from '../theme';

const customLightTheme = createTheme(primitives, overrides);

const engine = new Styletron();

export default function BaseWebProvider(
  props: PropsWithChildren,
): React.ReactElement {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={customLightTheme}>{props.children}</BaseProvider>
    </StyletronProvider>
  );
}
