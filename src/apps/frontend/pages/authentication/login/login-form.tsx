import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, FormControl, Input } from '../../../components';
import routes from '../../../constants/routes';
import { AsyncError } from '../../../types';
import { ButtonKind, ButtonType } from '../../../types/button';

import LoginFormCheckbox from './login-form-checkbox';
import useLoginForm from './login-form.hook';

interface LoginFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onError, onSuccess }) => {
  const { formik, isLoginLoading } = useLoginForm({ onSuccess, onError });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const togglePasswordOnClick = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    togglePasswordVisibility();
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4.5">
          <FormControl
            label={'Email'}
            error={formik.touched.username && formik.errors.username}
          >
            <Input
              data-testid="username"
              disabled={isLoginLoading}
              endEnhancer={
                <img
                  className="fill-current opacity-50"
                  src="/assets/img/icon/email.svg"
                  alt="email icon"
                />
              }
              error={formik.touched.username && formik.errors.username}
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter your email"
              value={formik.values.username}
            />
          </FormControl>
        </div>

        <div>
          <FormControl
            label={'Password'}
            error={formik.touched.password && formik.errors.password}
          >
            <Input
              data-testid="password"
              disabled={isLoginLoading}
              endEnhancer={
                <Button
                  onClick={togglePasswordOnClick}
                  kind={ButtonKind.SECONDARY}
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
                </Button>
              }
              error={formik.touched.password && formik.errors.password}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
              type={isPasswordVisible ? 'text' : 'password'}
              value={formik.values.password}
            />
          </FormControl>
        </div>

        <div className="mb-5.5 mt-5 flex items-center justify-between">
          <label htmlFor="formCheckbox" className="flex cursor-pointer">
            <LoginFormCheckbox />
            <p>Remember me</p>
          </label>

          <a href="#" className="text-sm text-primary hover:underline">Forget password?</a>
        </div>

        <Button type={ButtonType.SUBMIT} kind={ButtonKind.PRIMARY} isLoading={isLoginLoading}>
        Log In
        </Button>

        <div className="mt-6 text-center">
          <p className="font-medium">
            Don’t have any account?{' '}
            <Link to={routes.SIGNUP} className="text-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
