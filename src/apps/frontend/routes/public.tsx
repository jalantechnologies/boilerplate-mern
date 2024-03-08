import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import constants from '../constants/routes';
import {
  About, Login, Otp, PhoneLogin, Signup,
} from '../pages';

const LoginRoute: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const authMode = queryParams.get('auth_mode');

  if (authMode === 'otp') {
    return <PhoneLogin />;
  }

  return <Login />;
};

const SignupRoute: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const authMode = queryParams.get('auth_mode');

  if (authMode === 'otp') {
    return <Otp />;
  }

  return <Signup />;
};

export const publicRoutes = [
  { path: constants.LOGIN, element: <LoginRoute /> },
  { path: constants.SIGNUP, element: <SignupRoute /> },
  { path: constants.ABOUT, element: <About /> },
  { path: '*', element: <Navigate to={constants.LOGIN} /> },
];
