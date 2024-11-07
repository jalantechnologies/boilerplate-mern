import React from 'react';

import Spinner from '../spinner/spinner';

const FullScreenSpinner: React.FC = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Spinner />
  </div>
);

export default FullScreenSpinner;
