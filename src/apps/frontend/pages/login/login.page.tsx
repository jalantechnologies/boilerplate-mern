import { Block } from 'baseui/block';
import { HeadingMedium } from 'baseui/typography';
import { useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import * as Yup from 'yup';

import { ButtonKind } from '../../components/button/button.component';
import {
  Input, Checkbox, Button, Error,
} from '../../components/index';
import './login.page.css';
import constant from '../../constants';
import { useDeps } from '../../contexts';

export default function Login(): React.ReactElement {
  // const { accessService } = useDeps();
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [success, setSuccess] = useState(false);
  // const [error, setError] = useState(false);

  const login = useCallback(() => {
    setSuccess(false);
    setError(false);

    accessService
      .login(username, password)
      .then(() => {
        setSuccess(true);
      })
      .catch(() => {
        setError(true);
      });
  }, [
    accessService,
    username,
    password,
  ]);

  return (
    <Block
      backgroundColor="backgroundPrimary"
      style={{
        margin: 0,
        padding: 0,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form style={{ width: '300px' }} onSubmit={formik.handleSubmit}>
        {success ? <h2 id='success'>SUCCESS!</h2> : null}
        {error ? <h2 id='error'>ERROR!</h2> : null}
        <HeadingMedium
          color="fontColor"
          style={{
            fontFamily: 'sans-serif',
            fontWeight: 'normal',
            fontSize: '27px',
            marginBottom: '1rem',
          }}
        >
          Please sign in
        </HeadingMedium>

        <Block>
          <Input
            testId="username"
            name="username"
            placeholder="Email address"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
          ></Input>
          {formik.touched.username && formik.errors.username ? (
            <Error data-testid="username-error">{formik.errors.username}</Error>
          ) : null}
        </Block>
        <Block>
          <Input
            testId="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            autoComplete="off"
          ></Input>
          {formik.touched.password && formik.errors.password ? (
            <Error data-testid="password-error">{formik.errors.password}</Error>
          ) : null}
        </Block>
        <Block style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          <Checkbox
            name="rememberMe"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            checked={formik.values.rememberMe}
          >
            Remember me
          </Checkbox>
        </Block>
        <Block>
          <Button kind={ButtonKind.PRIMARY} type="submit">
            Sign in
          </Button>
        </Block>
      </form>
    </Block>
  );
}
