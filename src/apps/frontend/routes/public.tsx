import constant from 'frontend/constants';
import routes from 'frontend/constants/routes';
import { ResetPasswordProvider } from 'frontend/contexts';
import { DocumentationProvider } from 'frontend/contexts/documentation.provider';
import { Config } from 'frontend/helpers';
import {
  About,
  ForgotPassword,
  Login,
  OTPVerificationPage,
  PhoneLogin,
  ResetPassword,
  Signup,
} from 'frontend/pages';
import Documentation from 'frontend/pages/documentation';
import React from 'react';
import { Navigate } from 'react-router-dom';

const currentAuthMechanism = Config.getConfigValue<string>(
  'authenticationMechanism'
);

export const publicRoutes = [
  {
    path: routes.FORGOT_PASSWORD,
    element: (
      <ResetPasswordProvider>
        <ForgotPassword />
      </ResetPasswordProvider>
    ),
  },
  {
    path: routes.RESET_PASSWORD,
    element: (
      <ResetPasswordProvider>
        <ResetPassword />
      </ResetPasswordProvider>
    ),
  },
  { path: routes.ABOUT, element: <About /> },
  {
    path: routes.DOCUMENTATION,
    element: (
      <DocumentationProvider>
        <Documentation />
      </DocumentationProvider>
    ),
  },
  { path: '*', element: <Navigate to={routes.LOGIN} /> },
];

if (currentAuthMechanism === constant.PHONE_NUMBER_BASED_AUTHENTICATION) {
  publicRoutes.push(
    {
      path: routes.LOGIN,
      element: <PhoneLogin />,
    },
    {
      path: routes.VERIFY_OTP,
      element: <OTPVerificationPage />,
    }
  );
}

if (currentAuthMechanism === constant.EMAIL_BASED_AUTHENTICATION) {
  publicRoutes.push(
    {
      path: routes.LOGIN,
      element: <Login />,
    },
    {
      path: routes.SIGNUP,
      element: <Signup />,
    }
  );
}
