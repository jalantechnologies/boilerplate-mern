import React, {
  createContext,
  PropsWithChildren,
  useContext,
} from 'react';

import { AuthService } from '../services';
import {
  AccessToken, ApiResponse, AsyncError, AuthRecord,
} from '../types';

import useAsync from './async.hook';

type AuthContextType = {
  isLoginLoading: boolean;
  isUserAuthenticated: () => boolean;
  login: (username: string, password: string) => Promise<AccessToken>;
  loginError: AsyncError;
  loginResult: AccessToken;
  logout: () => void;
  sendOTP: (
    countryCode: string,
    phoneNumber: string,
  ) => Promise<AuthRecord>;
  verifyOTP: (
    authRecordId: string,
    otp: string,
  ) => Promise<AuthRecord>;
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

const logoutFn = (): void => localStorage.removeItem('access-token');

const getAccessToken = (): AccessToken => JSON.parse(localStorage.getItem('access-token')) as AccessToken;

const isUserAuthenticated = () => !!getAccessToken();

const sendOTP = (countryCode: string, phoneNumber: string): Promise<AuthRecord> => {
  // Backend Integration
  console.log(countryCode, phoneNumber);
  return null;
};

const verifyOTP = (
  authRecordId: string,
  otp: string,
): Promise<AuthRecord> => {
  // Backend Integration
  console.log(authRecordId, otp);
  return null;
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    isLoading: isLoginLoading,
    error: loginError,
    result: loginResult,
    asyncCallback: login,
  } = useAsync(loginFn);

  return (
    <AuthContext.Provider
      value={{
        logout: logoutFn,
        isLoginLoading,
        isUserAuthenticated,
        login,
        loginError,
        loginResult,
        sendOTP,
        verifyOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
