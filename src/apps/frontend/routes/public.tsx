import React from 'react';
import { Navigate } from 'react-router-dom';

import routes from '../constants/routes';
import {
  About,
  ForgotPassword,
  Login,
  OTPPage,
  PhoneLogin,
  ResetPassword,
  Signup,
} from '../pages';
import { ResetPasswordProvider } from '../contexts';

import AuthRoute from './auth-route';

export const publicRoutes = [
  { path: routes.LOGIN, element: <AuthRoute authPage={Login} otpAuthPage={OTPPage} /> },
  { path: routes.SIGNUP, element: <AuthRoute authPage={Signup} otpAuthPage={PhoneLogin} /> },
  {
    path: constants.FORGOT_PASSWORD,
    element: <ResetPasswordProvider><ForgotPassword /></ResetPasswordProvider>,
  },
  {
    path: constants.RESET_PASSWORD,
    element: <ResetPasswordProvider><ResetPassword /></ResetPasswordProvider>,
  },
  { path: constants.ABOUT, element: <About /> },
  { path: '*', element: <Navigate to={constants.LOGIN} /> },
];
