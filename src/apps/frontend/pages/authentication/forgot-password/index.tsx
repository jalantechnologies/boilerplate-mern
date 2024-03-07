import React from 'react';

import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import ForgotPasswordForm from './forgot-password-form';

export const ForgotPassword: React.FC = () => {

  return (
    <AuthenticationPageLayout>
      <AuthenticationFormLayout>
        <ForgotPasswordForm />
      </AuthenticationFormLayout>
    </AuthenticationPageLayout>
  );
};

export default ForgotPassword;