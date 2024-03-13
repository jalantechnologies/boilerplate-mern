import React from 'react';
import { Navigate } from 'react-router-dom';

import constants from '../constants/routes';
import {
  About,
  Login,
  OTPPage,
  PhoneLogin,
  Signup,
} from '../pages';
import AuthRoute from './auth-route';

export const publicRoutes = [
  { path: constants.LOGIN, element: <AuthRoute authPage={Login} otpAuthPage={OTPPage} /> },
  { path: constants.SIGNUP, element: <AuthRoute authPage={Signup} otpAuthPage={PhoneLogin} /> },
  { path: constants.ABOUT, element: <About /> },
  { path: '*', element: <Navigate to={constants.LOGIN} /> },
];
