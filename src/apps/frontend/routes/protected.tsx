import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import routes from '../constants/routes';
import { TaskProvider, useAccountContext } from '../contexts';
import { Dashboard, NotFound, Tasks } from '../pages';
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
            <Tasks />
          </TaskProvider>
          </CommentProvider>
        ),
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];
