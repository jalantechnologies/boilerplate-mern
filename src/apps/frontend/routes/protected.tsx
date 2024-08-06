import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import routes from '../constants/routes';
import { TaskProvider, useAccountContext } from '../contexts';
import { SharedTaskProvider } from '../contexts/shared-task.provider';
import { Dashboard, NotFound, Tasks } from '../pages';
import SharedTasks from '../pages/shared-tasks';
import AppLayout from '../pages/app-layout/app-layout';
import { CommentProvider } from '../contexts/comment.provider';

const App = () => {
  const { getAccountDetails } = useAccountContext();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAccountDetails();
  }, [getAccountDetails]);

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export const protectedRoutes = [
  {
    path: '',
    element: <App />,
    children: [
      { path: routes.DASHBOARD, element: <Dashboard /> },
      {
        path: routes.TASKS,
        element: (
          <CommentProvider>
            <TaskProvider>
<<<<<<< HEAD
              <Tasks />
            </TaskProvider>
          </CommentProvider>
        ),
      },
      {
        path: routes.SHARED_TASKS,
        element: (
          <CommentProvider>
            <SharedTaskProvider>
              <SharedTasks />
            </SharedTaskProvider>
=======
            <Tasks />
          </TaskProvider>
>>>>>>> 09e6ecb626c02d7c8caec3ecdfe0c0c0be1e2e4c
          </CommentProvider>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];
