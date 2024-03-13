import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FormControl, Input } from '../../../components';
import routes from '../../../constants/routes';
import { AsyncError } from '../../../types';

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
                <button
                  className="inset-y-0 flex items-center"
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

        <button
          className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-primary/90 active:bg-primary/80
            ${isLoginLoading && 'cursor-not-allowed bg-primary/80 hover:bg-primary/80'}`
          }
          disabled={isLoginLoading}
          type="submit"
        >
          Log In
        </button>
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
