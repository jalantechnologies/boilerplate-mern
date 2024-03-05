import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FormControl, Input } from '../../../components';
import constants from '../../../constants/routes';
import { AsyncError } from '../../../types';

import useSignupForm from './signup-form.hook';

interface SignupFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onError, onSuccess }) => {
  const { formik, isSignupLoading } = useSignupForm({ onSuccess, onError });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <>
      <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
        Sign Up
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <FormControl
            label={'Email'}
            error={formik.touched.username && formik.errors.username}
          >
            <Input
              error={formik.touched.username && formik.errors.username}
              data-testid="username"
              disabled={isSignupLoading}
              name="username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter your email"
              value={formik.values.username}
            />
            <span className="absolute right-4 top-4.5">
              <img
                alt="email icon"
                className="fill-current opacity-50"
                src="/assets/img/icon/email.svg"
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
              error={formik.touched.password && formik.errors.password}
              data-testid="password"
              disabled={isSignupLoading}
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
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
                  alt="hide password icon"
                  src="/assets/img/icon/eye-closed.svg"
                  className="size-6.5 opacity-65"
                />
              ) : (
                <img
                  alt="show password icon"
                  src="/assets/img/icon/eye-open.svg"
                  className="size-6.5 opacity-65"
                />
              )}
            </button>
          </FormControl>
        </div>

        <button
          className={`w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-primary/90
            ${isSignupLoading && 'cursor-not-allowed bg-primary/70'}`
          }
          disabled={isSignupLoading}
          type="submit"
        >
          {isSignupLoading ? 'Loading...' : 'Sign Up'}
        </button>
        <div className='mr-2 mt-3 flex justify-end'>
          Already have an account?&nbsp;
          <Link to={constants.LOGIN} className="text-primary">
            Login
          </Link>
        </div>
      </form>
    </>
  );
};
export default SignupForm;