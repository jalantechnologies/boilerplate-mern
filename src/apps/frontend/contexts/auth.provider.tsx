import React, { createContext, PropsWithChildren, useContext } from 'react';

import constant from '../constants';
import { AuthService } from '../services';
import {
  AccessToken,
  ApiResponse,
  AsyncError,
  LoginMethod,
  LoginProps,
  PhoneNumber,
} from '../types';
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
  login: (username: string, password: string) => Promise<AccessToken>;
  loginError: AsyncError;
  loginProps: LoginProps;
  loginResult: AccessToken;
  logout: () => void;
  sendOTP: (phoneNumber: PhoneNumber) => Promise<void>;
  sendOTPError: AsyncError;
  setLoginProps: React.Dispatch<React.SetStateAction<LoginProps>>;
  signup: (
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ) => Promise<void>;
  signupError: AsyncError;
  verifyOTP: (phoneNumber: PhoneNumber, otp: string) => Promise<AccessToken>;
  verifyOTPError: AsyncError;
  verifyOTPResult: AccessToken;
};

const AuthContext = createContext<AuthContextType | null>(null);

const authService = new AuthService();

export const useAuthContext = (): AuthContextType => useContext(AuthContext);

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

const getAccessToken = (): AccessToken => getAccessTokenFromStorage();

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

const initialLoginProps = {
  defaultMobileLogin: LoginMethod.PHONE,
  defaultWebLogin: LoginMethod.EMAIL,
  displayEmailLoginOnMobile: constant.DISPLAY_EMAIL_LOGIN_ON_MOBILE,
  displayPhoneLoginOnWeb: constant.DISPLAY_PHONE_LOGIN_ON_WEB,
  displayRegisterAccount: constant.DISPLAY_REGISTER_ACCOUNT,
  currentLoginMethod: constant.DEFAULT_LOGIN_METHOD as LoginMethod,
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loginProps, setLoginProps] =
    React.useState<LoginProps>(initialLoginProps);

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
        loginProps,
        logout: logoutFn,
        sendOTP,
        sendOTPError,
        setLoginProps,
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
