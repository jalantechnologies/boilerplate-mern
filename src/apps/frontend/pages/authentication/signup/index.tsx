import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import constants from '../../../constants/routes';
import { AsyncError } from '../../../types';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import SignupForm from './signup-form';

export const Signup: React.FC = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    toast.success('Your account has been successfully created. Please login to continue.');
    navigate(constants.LOGIN);
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  return (
    <AuthenticationPageLayout>
      <AuthenticationFormLayout>
        <SignupForm onSuccess={onSuccess} onError={onError}></SignupForm>
      </AuthenticationFormLayout>
    </AuthenticationPageLayout>
  );
};

export default Signup;
