import React from 'react';
import { Navigate } from 'react-router-dom';

import constants from '../constants/routes';
import { About, Login, Signup } from '../pages';

export const publicRoutes = [
  { path: constants.LOGIN, element: <Login /> },
  { path: constants.SIGNUP, element: <Signup /> },
  { path: constants.ABOUT, element: <About /> },
  { path: '*', element: <Navigate to={constants.LOGIN} /> },
];
