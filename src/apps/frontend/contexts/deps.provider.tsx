import React, { createContext, ReactNode, useContext } from 'react';

import { AccessService } from '../services';

type Deps = {
  accessService: AccessService,
};

const DepsContext = createContext<Deps | undefined>(undefined);

export function useDeps() {
  return useContext(DepsContext);
}

export function DepsProvider(props: {
  children: ReactNode,
  deps: Deps,
}) {
  const {
    children,
    deps,
  } = props;

  return (
    <DepsContext.Provider value={deps}>
      {children}
    </DepsContext.Provider>
  );
}
