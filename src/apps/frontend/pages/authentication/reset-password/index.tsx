import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import constants from '../../../constants/routes';
import { AsyncError } from '../../../types';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import ResetPasswordForm from './reset-password-form';

export const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    toast.success('Your password has been successfully updated. Please login to continue.');
    navigate(constants.LOGIN);
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  return (
    <AuthenticationPageLayout>
      <AuthenticationFormLayout>
        <ResetPasswordForm onSuccess={onSuccess} onError={onError} />
      </AuthenticationFormLayout>
    </AuthenticationPageLayout>
  );
};

export default ResetPassword;
