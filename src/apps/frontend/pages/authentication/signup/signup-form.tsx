import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, FormControl, Input } from '../../../components';
import routes from '../../../constants/routes';
import { AsyncError } from '../../../types';
import { ButtonKind, ButtonType } from '../../../types/button';

import useSignupForm from './signup-form.hook';

interface SignupFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onError, onSuccess }) => {
  const { formik, isSignupLoading } = useSignupForm({ onSuccess, onError });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRetypePasswordVisible, setIsRetypePasswordVisible] = useState(false);

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  function toggleRetypePasswordVisibility() {
    setIsRetypePasswordVisible((prevState) => !prevState);
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4.5 flex flex-col gap-6 2sm:flex-row">
          <div className="w-full 2sm:w-1/2">
            <FormControl
              label={'First name'}
              error={formik.touched.firstName && formik.errors.firstName}
            >
              <Input
                error={formik.touched.firstName && formik.errors.firstName}
                data-testid="firstName"
                disabled={isSignupLoading}
                name="firstName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Enter your first name"
                value={formik.values.firstName}
              />
            </FormControl>
          </div>
          <div className="w-full 2sm:w-1/2">
            <FormControl
              label={'Last name'}
              error={formik.touched.lastName && formik.errors.lastName}
            >
              <Input
                error={formik.touched.lastName && formik.errors.lastName}
                data-testid="lastName"
                disabled={isSignupLoading}
                name="lastName"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder="Enter your last name"
                value={formik.values.lastName}
              />
            </FormControl>
          </div>
        </div>
        <div className="mb-4.5">
          <FormControl
            label={'Email'}
            error={formik.touched.username && formik.errors.username}
          >
            <Input
              data-testid="username"
              disabled={isSignupLoading}
              endEnhancer={
                <img
                  alt="email icon"
                  className="fill-current opacity-50"
                  src="/assets/img/icon/email.svg"
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
        <div className="mb-4.5">
          <FormControl
            label={'Password'}
            error={formik.touched.password && formik.errors.password}
          >
            <Input
              data-testid="password"
              disabled={isSignupLoading}
              endEnhancer={
                <Button
                  onClick={(e: { preventDefault: () => void }) => {
                    e.preventDefault();
                    togglePasswordVisibility();
                  }}
                  kind={ButtonKind.SECONDARY}
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
                </Button>
              }
              error={formik.touched.password && formik.errors.password}
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter your password"
              type={isPasswordVisible ? 'text' : 'password'}
              value={formik.values.password}
            />
          </FormControl>
        </div>
        <div className="mb-6">
          <FormControl
            label={'Re-type Password'}
            error={
              formik.touched.retypePassword && formik.errors.retypePassword
            }
          >
            <Input
              data-testid="retypePassword"
              disabled={isSignupLoading}
              endEnhancer={
                <Button
                  onClick={(e: { preventDefault: () => void }) => {
                    e.preventDefault();
                    toggleRetypePasswordVisibility();
                  }}
                  kind={ButtonKind.SECONDARY}
                >
                  {isRetypePasswordVisible ? (
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
                </Button>
              }
              error={
                formik.touched.retypePassword && formik.errors.retypePassword
              }
              name="retypePassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Re-enter the password"
              type={isRetypePasswordVisible ? 'text' : 'password'}
              value={formik.values.retypePassword}
            />
          </FormControl>
        </div>

        <Button
          type={ButtonType.SUBMIT}
          kind={ButtonKind.PRIMARY}
          isLoading={isSignupLoading}
        >
          Sign Up
        </Button>

        <div className="mt-6 text-center">
          <p className="font-medium">
            Already have an account?{' '}
            <Link to={routes.LOGIN} className="text-primary">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
