import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import routes from '../../../constants/routes';
import { AsyncError } from '../../../types';
import AuthenticationFormLayout from '../authentication-form-layout';
import AuthenticationPageLayout from '../authentication-page-layout';

import LoginForm from './login-form';
import { FormContainer } from '../../../components';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    navigate(routes.DASHBOARD);
  };

  const onError = (error: AsyncError) => {
    toast.error(error.message);
  };

  return (
    <AuthenticationPageLayout>
      <AuthenticationFormLayout>
        <FormContainer
          body={
            <LoginForm
              onError={onError}
              onSuccess={onSuccess}
            />
          }
          title="Log In"
        />
      </AuthenticationFormLayout>
    </AuthenticationPageLayout>
  );
};

export default Login;
