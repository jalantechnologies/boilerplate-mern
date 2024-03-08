import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { AuthService } from '../services';
import {
  AccessToken, ApiResponse, AsyncError, PhoneNumber,
} from '../types';

import useAsync from './async.hook';

type AuthContextType = {
  isLoginLoading: boolean;
  isSendOtpLoading: boolean;
  isSignupLoading: boolean;
  isUserAuthenticated: () => boolean;
  isVerifyOtpLoading: boolean;
  login: (username: string, password: string) => Promise<AccessToken>;
  loginError: AsyncError;
  loginResult: AccessToken;
  logout: () => void;
  phoneNumber: PhoneNumber;
  sendOtp: (
    countryCode: string,
    phoneNumber: string,
  ) => Promise<void>;
  sendOtpError: AsyncError;
  setPhoneNumber: React.Dispatch<React.SetStateAction<PhoneNumber>>;
  signup: (
    firstName: string,
    lastName: string,
    username: string,
    password: string
  ) => Promise<void>;
  signupError: AsyncError;
  verifyOtp: (
    countryCode: string,
    phoneNumber: string,
    otp: string,
  ) => Promise<AccessToken>;
  verifyOtpError: AsyncError;
  verifyOtpResult: AccessToken;
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

const logoutFn = (): void => localStorage.removeItem('access-token');

const getAccessToken = (): AccessToken => JSON.parse(localStorage.getItem('access-token')) as AccessToken;

const isUserAuthenticated = () => !!getAccessToken();

const sendOtpFn = async (
  countryCode: string,
  phoneNumber: string,
): Promise<ApiResponse<void>> => authService.sendOtp(
  countryCode,
  phoneNumber,
);

const verifyOtpFn = async (
  countryCode: string,
  phoneNumber: string,
  otp: string,
): Promise<ApiResponse<AccessToken>> => {
  const result = await authService.verifyOtp(countryCode, phoneNumber, otp);
  if (result.data) {
    localStorage.setItem('access-token', JSON.stringify(result.data));
  }
  return result;
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState<PhoneNumber>();

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
    isLoading: isSendOtpLoading,
    error: sendOtpError,
    asyncCallback: sendOtp,
  } = useAsync(sendOtpFn);

  const {
    isLoading: isVerifyOtpLoading,
    error: verifyOtpError,
    result: verifyOtpResult,
    asyncCallback: verifyOtp,
  } = useAsync(verifyOtpFn);

  return (
    <AuthContext.Provider
      value={{
        isLoginLoading,
        isSendOtpLoading,
        isSignupLoading,
        isUserAuthenticated,
        isVerifyOtpLoading,
        login,
        loginError,
        loginResult,
        logout: logoutFn,
        phoneNumber,
        sendOtp,
        sendOtpError,
        setPhoneNumber,
        signup,
        signupError,
        verifyOtp,
        verifyOtpError,
        verifyOtpResult,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
