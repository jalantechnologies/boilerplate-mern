import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import constants from '../constants/routes';
import {
  About, Login, OTPPage, PhoneLogin, Signup,
} from '../pages';

interface AuthRouteProps {
  authPage: React.FC;
  otpAuthPage: React.FC;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ authPage: AuthPage, otpAuthPage: OTPAuthPage }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const authMode = queryParams.get('auth_mode');

  return authMode === 'otp' ? <OTPAuthPage /> : <AuthPage />;
};

export const publicRoutes = [
  { path: constants.LOGIN, element: <AuthRoute authPage={Login} otpAuthPage={OTPPage} /> },
  { path: constants.SIGNUP, element: <AuthRoute authPage={Signup} otpAuthPage={PhoneLogin} /> },
  { path: constants.ABOUT, element: <About /> },
  { path: '*', element: <Navigate to={constants.LOGIN} /> },
];
