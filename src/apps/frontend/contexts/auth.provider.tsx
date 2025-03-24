import React, { createContext, PropsWithChildren, useContext } from 'react';

import { AuthService } from '../services';
import { AccessToken, ApiResponse, AsyncError, PhoneNumber } from '../types';
import { Nullable } from '../types/common';
import {
  getAccessTokenFromStorage,
  removeAccessTokenFromStorage,
  setAccessTokenToStorage,
} from '../utils/storage-util';

import useAsync from './async.hook';

type AuthContextType = {
  isLoginLoading: boolean;
  isSendOTPLoading: boolean;
  isSignupLoading: boolean;
  isUserAuthenticated: () => boolean;
  isVerifyOTPLoading: boolean;
  login: (username: string, password: string) => Promise<Nullable<AccessToken>>;
  loginError: Nullable<AsyncError>;
  loginResult: Nullable<AccessToken>;
  logout: () => void;
  sendOTP: (phoneNumber: PhoneNumber) => Promise<Nullable<void>>;
  sendOTPError: Nullable<AsyncError>;
  signup: (
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ) => Promise<Nullable<void>>;
  signupError: Nullable<AsyncError>;
  verifyOTP: (
    phoneNumber: PhoneNumber,
    otp: string
  ) => Promise<Nullable<AccessToken>>;
  verifyOTPError: Nullable<AsyncError>;
  verifyOTPResult: Nullable<AccessToken>;
};

const AuthContext = createContext<Nullable<AuthContextType>>(null);

const authService = new AuthService();

export const useAuthContext = (): AuthContextType =>
  useContext(AuthContext) as AuthContextType;

const loginFn = async (
  username: string,
  password: string
): Promise<ApiResponse<AccessToken>> => {
  const result = await authService.login(username, password);
  if (result.data) {
    setAccessTokenToStorage(result.data);
  }
  return result;
};

const signupFn = async (
  firstName: string,
  lastName: string,
  username: string,
  password: string
): Promise<ApiResponse<void>> =>
  authService.signup(firstName, lastName, username, password);

const logoutFn = (): void => removeAccessTokenFromStorage();

const getAccessToken = (): AccessToken =>
  getAccessTokenFromStorage() as AccessToken;

const isUserAuthenticated = () => !!getAccessToken();

const sendOTPFn = async (
  phoneNumber: PhoneNumber
): Promise<ApiResponse<void>> => authService.sendOTP(phoneNumber);

const verifyOTPFn = async (
  phoneNumber: PhoneNumber,
  otp: string
): Promise<ApiResponse<AccessToken>> => {
  const result = await authService.verifyOTP(phoneNumber, otp);
  if (result.data) {
    setAccessTokenToStorage(result.data);
  }
  return result;
};

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
    isLoading: isSendOTPLoading,
    error: sendOTPError,
    asyncCallback: sendOTP,
  } = useAsync(sendOTPFn);

  const {
    isLoading: isVerifyOTPLoading,
    error: verifyOTPError,
    result: verifyOTPResult,
    asyncCallback: verifyOTP,
  } = useAsync(verifyOTPFn);

  return (
    <AuthContext.Provider
      value={{
        isLoginLoading,
        isSendOTPLoading,
        isSignupLoading,
        isUserAuthenticated,
        isVerifyOTPLoading,
        login,
        loginError,
        loginResult,
        logout: logoutFn,
        sendOTP,
        sendOTPError,
        signup,
        signupError,
        verifyOTP,
        verifyOTPError,
        verifyOTPResult,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
