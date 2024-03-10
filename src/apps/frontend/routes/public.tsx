import React from 'react';
import { Navigate } from 'react-router-dom';

import constants from '../constants/routes';
import {
  About, ForgotPassword, Login, ResetPassword, Signup,
} from '../pages';

export const publicRoutes = [
  { path: constants.LOGIN, element: <Login /> },
  { path: constants.SIGNUP, element: <Signup /> },
  { path: constants.FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: constants.RESET_PASSWORD, element: <ResetPassword /> },
  { path: constants.ABOUT, element: <About /> },
  { path: '*', element: <Navigate to={constants.LOGIN} /> },
];
