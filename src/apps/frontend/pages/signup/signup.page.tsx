import { BaseProvider, LightTheme } from 'baseui';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';

import { ParagraphMedium } from 'baseui/typography';

import { useFormik } from 'formik';

import React from 'react';
import { Link } from 'react-router-dom';

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import FormInput from '../../components/form-input/form-input.component';
import { useAuth } from '../../contexts/auth-context.provider';
import { Error } from '../../components/error/error.component';

const engine = new Styletron();

const initialValues = {
  email: '',
  password: '',
};

interface SignUpFomrErrorType {
  email?: string;
  password?: string;
}

const Signup = () => {
  const { signUp } = useAuth();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await signUp(values.email, values.password);
    },
    validate: (values) => {
      let errors: SignUpFomrErrorType = {};
      if (!values.email) {
        errors.email = 'email required';
      }
      if (!values.password) {
        errors.password = 'password is required';
      }
      return errors;
    },
    validateOnMount: true,
  });
  console.log(formik.values.email);
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Block
          height={'100vh'}
          overrides={{
            Block: {
              style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              },
            },
          }}
        >
          <Block as="h1">Welcome to Signup Page!</Block>
          <ParagraphMedium marginTop="scale0">
            Already have an account? <Link to="/">Sign In</Link>
          </ParagraphMedium>
          <form onSubmit={formik.handleSubmit}>
            <FormInput
              autoComplete="off"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Enter your Email ID"
              required
              startEnhancer="@"
              testId="email"
              type="email"
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <Error>{formik.errors.email}</Error>
            ) : null}
            <FormInput
              autoComplete="off"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder="Password"
              required
              startEnhancer=" "
              testId="password"
              type="password"
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <Error>{formik.errors.password}</Error>
            ) : null}
          </form>
          <Block marginTop={'scale500'} marginLeft={'scale650'}>
            <Button type="submit">Signup</Button>
          </Block>
        </Block>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default Signup;
