import React from 'react';
import { Outlet } from 'react-router-dom';

import { Dashboard } from '../pages';
import AppLayout from '../pages/app-layout/app-layout';

const App = () => (
  <AppLayout>
    <Outlet />
  </AppLayout>
);

export const protectedRoutes = [
  {
    path: '',
    element: <App />,
    children: [
      { path: '', element: <Dashboard /> },
    ],
  },
];
