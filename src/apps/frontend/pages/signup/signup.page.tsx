import { BaseProvider, LightTheme, Theme } from 'baseui';
import { Block } from 'baseui/block';
import { Button } from 'baseui/button';
import { Input } from 'baseui/input';
import { ParagraphMedium } from 'baseui/typography';

import { useFormik } from 'formik';

import React from 'react';
import { Link } from 'react-router-dom';

import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';

import { useDeps } from '../../contexts';

const engine = new Styletron();

interface BaseUIStyleProps extends Theme {
  $theme: Theme;
  isFocused: boolean;
}

const initialValues = {
  email: '',
  password: '',
};

const Signup = () => {
  const { accessService } = useDeps();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await accessService.signup(values.email, values.password);
    }
  });
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
          <Block>
            <form onSubmit={formik.handleSubmit}>
              <Block marginTop={'scale700'}>
                <Input
                  autoComplete="off"
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Enter you Email ID"
                  startEnhancer="@"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  required
                  overrides={{
                    Root: {
                      style: ({ $theme, isFocused }: BaseUIStyleProps) => ({
                        border: isFocused
                          ? `${$theme.sizing.scale0} solid ${$theme.colors.primaryA}`
                          : `${$theme.sizing.scale0} solid ${$theme.colors.primaryB}`,
                      }),
                    },
                  }}
                />
              </Block>
              <Block marginTop={'scale700'}>
                <Input
                  autoComplete="off"
                  name="password"
                  type="password"
                  id="password"
                  placeholder="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  required
                  overrides={{
                    Root: {
                      style: ({ $theme, isFocused }: BaseUIStyleProps) => ({
                        border: isFocused
                          ? `${$theme.sizing.scale0} solid ${$theme.colors.primaryA}`
                          : `${$theme.sizing.scale0} solid ${$theme.colors.primaryB}`,
                      }),
                    },
                  }}
                />
              </Block>
              <Block marginTop={'scale500'} marginLeft={'scale2400'}>
                <Button type="submit">Signup</Button>
              </Block>
            </form>
          </Block>
        </Block>
      </BaseProvider>
    </StyletronProvider>
  );
};

export default Signup;
