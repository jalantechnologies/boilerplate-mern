import React from 'react';

import { About, Login, NotFound } from '../pages';

export const publicRoutes = [
  { path: '/login', element: <Login /> },
  { path: '/about', element: <About /> },
  { path: '*', element: <NotFound /> },
];
