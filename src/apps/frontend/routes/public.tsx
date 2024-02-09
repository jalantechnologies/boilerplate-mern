import React from 'react';
import { Navigate } from 'react-router-dom';

import constants from '../constants/routes';
import { About, Login } from '../pages';

export const publicRoutes = [
  { path: constants.LOGIN, element: <Login /> },
  { path: constants.ABOUT, element: <About /> },
  { path: '*', element: <Navigate to={constants.LOGIN} /> },
];
