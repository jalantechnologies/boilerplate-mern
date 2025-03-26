import React from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Flex,
  FormControl,
  Input,
  PasswordInput,
  VerticalStackLayout,
} from '../../../components';
import routes from '../../../constants/routes';
import { AsyncError } from '../../../types';
import { ButtonKind, ButtonSize, ButtonType } from '../../../types/button';

import useSignupForm from './signup-form.hook';

interface SignupFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onError, onSuccess }) => {
  const { formik, isSignupLoading } = useSignupForm({ onSuccess, onError });

  return (
    <form onSubmit={formik.handleSubmit}>
      <VerticalStackLayout gap={5}>
        <Flex gap={6}>
          <div className="w-full">
            <FormControl
              label={'First name'}
              error={
                formik.touched.firstName ? formik.errors.firstName : undefined
              }
            >
              <Input
                error={
                  formik.touched.firstName ? formik.errors.firstName : undefined
                }
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
          <div className="w-full">
            <FormControl
              label={'Last name'}
              error={
                formik.touched.lastName ? formik.errors.lastName : undefined
              }
            >
              <Input
                error={
                  formik.touched.lastName ? formik.errors.lastName : undefined
                }
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
        </Flex>
        <FormControl
          label={'Email'}
          error={formik.touched.username ? formik.errors.username : undefined}
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
            error={formik.touched.username ? formik.errors.username : undefined}
            name="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder="Enter your email"
            value={formik.values.username}
          />
        </FormControl>
        <FormControl
          label={'Password'}
          error={formik.touched.password ? formik.errors.password : undefined}
        >
          <PasswordInput
            error={formik.touched.password ? formik.errors.password : undefined}
            name={'password'}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder={'Enter your password'}
            value={formik.values.password}
          />
        </FormControl>
        <FormControl
          label={'Re-type Password'}
          error={
            formik.touched.retypePassword
              ? formik.errors.retypePassword
              : undefined
          }
        >
          <PasswordInput
            error={
              formik.touched.retypePassword
                ? formik.errors.retypePassword
                : undefined
            }
            name={'retypePassword'}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            placeholder={'Re-enter the password'}
            value={formik.values.retypePassword}
          />
        </FormControl>

        <Button
          type={ButtonType.SUBMIT}
          kind={ButtonKind.PRIMARY}
          isLoading={isSignupLoading}
          size={ButtonSize.LARGE}
        >
          Sign Up
        </Button>
        <p className="self-center font-medium">
          Already have an account?{' '}
          <Link to={routes.LOGIN} className="text-primary">
            Log in
          </Link>
        </p>
      </VerticalStackLayout>
    </form>
  );
};

export default SignupForm;
