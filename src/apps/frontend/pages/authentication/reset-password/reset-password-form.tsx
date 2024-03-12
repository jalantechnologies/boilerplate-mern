import React, { useState } from 'react';

import { FormControl, Input } from '../../../components';
import { AsyncError } from '../../../types';

import useResetPasswordForm from './reset-password-form.hook';

interface ResetPasswordFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  onSuccess,
  onError,
}) => {
  const { formik, isResetPasswordLoading } = useResetPasswordForm({ onSuccess, onError });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRetypePasswordVisible, setIsRetypePasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((previousState) => !previousState);
  }

  function toggleRetypePasswordVisibility() {
    setIsRetypePasswordVisible((previousState) => !previousState);
  }

  return (
    <div>
      <h2 className="mb-5 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Reset Password
      </h2>
      <h3 className="mb-4 text-xl font-medium">
        Setup your new password here
      </h3>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4.5">
          <FormControl
            error={formik.touched.password && formik.errors.password}
            label={'Password'}
          >
            <Input
              data-testid="password"
              disabled={isResetPasswordLoading}
              error={formik.touched.password && formik.errors.password}
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={isPasswordVisible ? 'text' : 'password'}
              value={formik.values.password}
              placeholder="Enter your new password"
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center px-4"
              onClick={(e) => {
                e.preventDefault();
                togglePasswordVisibility();
              }}
            >
              {isPasswordVisible ? (
                <img
                  className="size-6.5 opacity-65"
                  src="/assets/img/icon/eye-closed.svg"
                  alt="hide password icon"
                />
              ) : (
                <img
                  className="size-6.5 opacity-65"
                  src="/assets/img/icon/eye-open.svg"
                  alt="show password icon"
                />
              )}
            </button>
          </FormControl>
        </div>
        <div className="mb-6">
          <FormControl
            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
            label={'Re-type Password'}
          >
            <Input
              data-testid="confirmPassword"
              disabled={isResetPasswordLoading}
              error={formik.touched.confirmPassword && formik.errors.confirmPassword}
              name="confirmPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={isRetypePasswordVisible ? 'text' : 'password'}
              value={formik.values.confirmPassword}
              placeholder="Re-enter the password"
            />
            <button
              className="absolute inset-y-0 right-0 flex items-center px-4"
              onClick={(e) => {
                e.preventDefault();
                toggleRetypePasswordVisibility();
              }}
            >
              {isRetypePasswordVisible ? (
                <img
                  className="size-6.5 opacity-65"
                  src="/assets/img/icon/eye-closed.svg"
                  alt="hide password icon"
                />
              ) : (
                <img
                  className="size-6.5 opacity-65"
                  src="/assets/img/icon/eye-open.svg"
                  alt="show password icon"
                />
              )}
            </button>
          </FormControl>
        </div>

        <button
          className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-primary/90 active:bg-primary/80
            ${isResetPasswordLoading && 'cursor-not-allowed bg-primary/80 hover:bg-primary/80'}`
          }
          disabled={isResetPasswordLoading}
          type="submit"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
