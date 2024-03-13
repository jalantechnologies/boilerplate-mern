import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FormControl, Input } from '../../../components';
import Button, { ButtonType } from '../../../components/button/button-primary';
import constants from '../../../constants/routes';
import { AsyncError } from '../../../types';

import BackButton from './back-button';
import useForgotPasswordForm from './forgot-password-form.hook';

interface ForgotPasswordFormProps {
  onError: (error: AsyncError) => void;
  onSuccess: (username: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onError,
  onSuccess,
}) => {
  const navigate = useNavigate();
  const isLoginLoading = false;
  const { formik } = useForgotPasswordForm({ onError, onSuccess });
  return (
    <>
      <BackButton onClick={() => navigate(constants.LOGIN)} />
      <h2 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Forgot Password?
      </h2>
      <p className="mb-4 text-xl font-medium">
        Enter your details to receive a reset link
      </p>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4.5">
          <FormControl
            error={formik.touched.username && formik.errors.username}
            label={'Email'}
          >
            <Input
              data-testid="username"
              disabled={isLoginLoading}
              error={formik.touched.username && formik.errors.username}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="username"
              value={formik.values.username}
              placeholder="Enter your email"
            />

            <span
              className="absolute right-4 top-4.5"
            >
              <img
                alt="email icon"
                className="fill-current opacity-50"
                src="/assets/img/icon/email.svg"
              />
            </span>
          </FormControl>
        </div>

        <Button
          label="Receive Reset Link"
          isLoading={isLoginLoading}
          type={ButtonType.SUBMIT}
        />
      </form>
    </>
  );
};

export default ForgotPasswordForm;
