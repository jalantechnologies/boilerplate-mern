import React from 'react';

const Spinner: React.FC = () => (
  <div className="flex size-full items-center justify-center">
    <span className="animate-spin">
      <img src="/assets/img/icon/spinner-icon.svg" alt="Loading..." />
    </span>
  </div>
);

export default Spinner;
