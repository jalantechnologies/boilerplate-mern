import React from 'react';
import { Navigate } from 'react-router-dom';

import routes from '../constants/routes';
import {
  About,
  Login,
  OTPPage,
  PhoneLogin,
  Signup,
} from '../pages';
import AuthRoute from './auth-route';

export const publicRoutes = [
  { path: routes.LOGIN, element: <AuthRoute authPage={Login} otpAuthPage={OTPPage} /> },
  { path: routes.SIGNUP, element: <AuthRoute authPage={Signup} otpAuthPage={PhoneLogin} /> },
  { path: routes.ABOUT, element: <About /> },
  { path: '*', element: <Navigate to={routes.LOGIN} /> },
];
