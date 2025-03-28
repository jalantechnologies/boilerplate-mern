import Spinner from 'frontend/components/spinner/spinner';
import React from 'react';

const FullScreenSpinner: React.FC = () => (
  <div className="flex h-screen w-full items-center justify-center">
    <Spinner />
  </div>
);

export default FullScreenSpinner;
