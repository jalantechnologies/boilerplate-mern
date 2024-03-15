import React, { PropsWithChildren, useState } from 'react';

import Button from '../button/button.component';

const MenuItem: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative flex">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        kind="tertiary"
        shape="circle"
      >
        <img src="assets/svg/more-alt.svg" />
      </Button>
      <div
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className={`absolute right-0 top-full z-40 w-40 space-y-1 rounded-sm border border-stroke bg-white p-1.5 shadow-default ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default MenuItem;
