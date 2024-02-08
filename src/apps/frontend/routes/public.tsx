import React from 'react';
import { Navigate } from 'react-router-dom';

import { About, Login } from '../pages';

export const publicRoutes = [
  { path: '/', element: <Login /> },
  { path: 'about', element: <About /> },
  { path: '*', element: <Navigate to="." /> },
];
