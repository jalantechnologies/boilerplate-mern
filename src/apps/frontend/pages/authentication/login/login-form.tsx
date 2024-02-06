import { Block } from 'baseui/block';
import { KIND } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Input } from 'baseui/input';
import { HeadingMedium } from 'baseui/typography';
import React from 'react';

import {
  Button,
} from '../../../components';
import { AsyncError } from '../../../types';

import useLoginForm from './login-form.hook';

interface LoginFormProps {
  onSuccess: () => void;
  onError: (error: AsyncError) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onError, onSuccess }) => {
  const { formik, isLoginLoading } = useLoginForm({ onSuccess, onError });

  return (
    <form onSubmit={formik.handleSubmit}>
      <HeadingMedium marginBottom="scale600">Please sign in</HeadingMedium>

      <Block>
        <FormControl
          error={formik.touched.username && formik.errors.username}
          label={'Email address'}
        >
          <Input
            autoComplete="off"
            disabled={isLoginLoading}
            name="username"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            overrides={{
              Input: {
                props: {
                  'data-testid': 'username',
                },
              },
            }}
            placeholder="Email address"
            value={formik.values.username}
          />
        </FormControl>
      </Block>
      <Block>
        <FormControl
          error={formik.touched.password && formik.errors.password}
          label={'Password'}
        >
          <Input
            autoComplete="off"
            disabled={isLoginLoading}
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            overrides={{
              Input: {
                props: {
                  'data-testid': 'password',
                },
              },
            }}
            placeholder="Password"
            type="password"
            value={formik.values.password}
          />
        </FormControl>
      </Block>
      <Block>
        <Button
          disabled={isLoginLoading}
          fullWidth
          isLoading={isLoginLoading}
          kind={KIND.primary}
          type="submit"
        >
          Sign in
        </Button>
      </Block>
    </form>
  );
};
export default LoginForm;
