import React from 'react';
import { Navigate } from 'react-router-dom';

import constants from '../constants/routes';
import {
  About, Login, LoginWithPhone, Otp,
} from '../pages';

export const publicRoutes = [
  { path: constants.LOGIN, element: <Login /> },
  { path: constants.PHONELOGIN, element: <LoginWithPhone /> },
  { path: constants.OTP, element: <Otp /> },
  { path: constants.ABOUT, element: <About /> },
  { path: '*', element: <Navigate to={constants.LOGIN} /> },
];
