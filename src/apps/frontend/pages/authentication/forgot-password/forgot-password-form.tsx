import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FormControl, Input } from '../../../components';
import constants from '../../../constants/routes';

import BackButton from './back-button';
import useForgotPasswordForm from './forgot-password-form.hook';
import { AsyncError } from '../../../types';

interface ForgotPasswordFormProps {
  onError: (error: AsyncError) => void;
  onSuccess: (username: string) => void;
  username: string;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onError,
  onSuccess,
  username,
}) => {
  const navigate = useNavigate();
  const isLoginLoading = false;
  const { formik } = useForgotPasswordForm({ onError, onSuccess, username });
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
            label={'Email'}
            error={formik.touched.username && formik.errors.username}
          >
            <Input
              data-testid="username"
              disabled={isLoginLoading}
              error={formik.touched.username && formik.errors.username}
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
              value={formik.values.username}
            />
            <span className="absolute right-4 top-4.5">
              <img
                className="fill-current opacity-50"
                src="/assets/img/icon/email.svg"
                alt="email icon"
              />
            </span>
          </FormControl>
        </div>

        <button
          className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-primary/90 active:bg-primary/80
            ${isLoginLoading && 'cursor-not-allowed bg-primary/80 hover:bg-primary/80'}`
          }
          disabled={isLoginLoading}
          type="submit"
        >
          Receive Reset Link
        </button>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
