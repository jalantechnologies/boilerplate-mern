import React, { PropsWithChildren } from 'react';

import { Header } from '../../components';

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => (
    <div>
      <div className="flex">
        <Header />
      </div>
      <div className='flex'>{children}</div>
    </div>
);

export default AppLayout;
