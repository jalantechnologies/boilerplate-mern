import React, { PropsWithChildren, useState } from 'react';

import { Header } from '../../components';

export const AppLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <div className="flex">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      <div className="flex">{children}</div>
    </div>
  );
};

export default AppLayout;
