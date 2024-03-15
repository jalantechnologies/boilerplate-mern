import * as React from 'react';
import toast from 'react-hot-toast';

import { TaskContainer } from '../../components';
import { AsyncError } from '../../types';

const Tasks: React.FC = () => {
  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  return (
      <div className='h-screen overflow-y-auto p-5'>
        <TaskContainer onError={onError} />
      </div>
  );
};

export default Tasks;
