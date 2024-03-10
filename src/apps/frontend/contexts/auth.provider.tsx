import React, {
  createContext,
  PropsWithChildren,
  useContext,
} from 'react';

import { AuthService } from '../services';
import {
  AccessToken, ApiResponse, AsyncError,
} from '../types';

import useAsync from './async.hook';

type AuthContextType = {
  isLoginLoading: boolean;
  isResetPasswordLoading: boolean;
  isSendForgotPasswordEmailLoading: boolean;
  isSignupLoading: boolean;
  isUserAuthenticated: () => boolean;
  login: (username: string, password: string) => Promise<AccessToken>;
  loginError: AsyncError;
  loginResult: AccessToken;
  logout: () => void;
  resetPassword: (accountId: string, password: string, token: string) => Promise<void>;
  resetPasswordError: AsyncError;
  sendForgotPasswordEmail: (username: string) => Promise<void>;
  sendForgotPasswordEmailError: AsyncError;
  signup: (
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ) => Promise<void>;
  signupError: AsyncError;
};

const AuthContext = createContext<AuthContextType | null>(null);

const authService = new AuthService();

export const useAuthContext = (): AuthContextType => useContext(AuthContext);

const loginFn = async (
  username: string,
  password: string,
): Promise<ApiResponse<AccessToken>> => {
  const result = await authService.login(username, password);
  if (result.data) {
    localStorage.setItem('access-token', JSON.stringify(result.data));
  }
  return result;
};

const signupFn = async (
  firstName: string,
  lastName: string,
  username: string,
  password: string,
): Promise<ApiResponse<void>> => authService.signup(
  firstName,
  lastName,
  username,
  password,
);

const resetPasswordFn = async (
  accountId: string,
  password: string,
  token: string,
): Promise<ApiResponse<void>> => authService.resetPassword(accountId, password, token);

const logoutFn = (): void => localStorage.removeItem('access-token');

const getAccessToken = (): AccessToken => JSON.parse(localStorage.getItem('access-token')) as AccessToken;

const isUserAuthenticated = () => !!getAccessToken();

const sendForgotPasswordEmailFn = async (
  username: string,
): Promise<ApiResponse<void>> => authService.sendForgotPasswordEmail(username);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    isLoading: isLoginLoading,
    error: loginError,
    result: loginResult,
    asyncCallback: login,
  } = useAsync(loginFn);

  const {
    isLoading: isSignupLoading,
    error: signupError,
    asyncCallback: signup,
  } = useAsync(signupFn);

  const {
    isLoading: isSendForgotPasswordEmailLoading,
    error: sendForgotPasswordEmailError,
    asyncCallback: sendForgotPasswordEmail,
  } = useAsync(sendForgotPasswordEmailFn);

  const {
    isLoading: isResetPasswordLoading,
    error: resetPasswordError,
    asyncCallback: resetPassword,
  } = useAsync(resetPasswordFn);

  return (
    <AuthContext.Provider
      value={{
        logout: logoutFn,
        isLoginLoading,
        isResetPasswordLoading,
        isSendForgotPasswordEmailLoading,
        isSignupLoading,
        isUserAuthenticated,
        login,
        loginError,
        loginResult,
        resetPassword,
        resetPasswordError,
        sendForgotPasswordEmail,
        sendForgotPasswordEmailError,
        signup,
        signupError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
