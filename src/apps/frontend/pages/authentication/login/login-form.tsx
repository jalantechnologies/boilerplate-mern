import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FormControl, Input } from '../../../components';
import constants from '../../../constants/routes';
import { AsyncError } from '../../../types';

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
      <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Sign In
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
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

        <div className="mb-6">
          <FormControl
            label={'Password'}
            error={formik.touched.password && formik.errors.password}
          >
            <Input
              data-testid="password"
              disabled={isLoginLoading}
              error={formik.touched.password && formik.errors.password}
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
              type={isPasswordVisible ? 'text' : 'password'}
              value={formik.values.password}
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

        <button
          className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-primary/90
            ${isLoginLoading && 'cursor-not-allowed bg-primary/70'}`
          }
          disabled={isLoginLoading}
          type="submit"
        >
          {isLoginLoading ? 'Loading...' : 'Sign In'}
        </button>
        <div className='mr-2 mt-3 flex justify-end'>
          Don't have an account?&nbsp;
          <Link to={constants.SIGNUP} className="text-primary">
            Sign Up
          </Link>
        </div>
      </form>
    </>
  );
};
export default LoginForm;
