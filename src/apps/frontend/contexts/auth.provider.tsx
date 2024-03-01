import React, {
  createContext,
  PropsWithChildren,
  useContext,
} from 'react';

import { AccountService, AuthService } from '../services';
import {
  AccessToken, Account, ApiResponse, AsyncError,
} from '../types';

import useAsync from './async.hook';

type AuthContextType = {
  accountError: AsyncError;
  accountResult: Account;
  getAccountDetails: () => Promise<Account>;
  isAccountLoading: boolean;
  isLoginLoading: boolean;
  isUserAuthenticated: () => boolean;
  login: (username: string, password: string) => Promise<AccessToken>;
  loginError: AsyncError;
  loginResult: AccessToken;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const authService = new AuthService();
const accountService = new AccountService();

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

const getAccountDetailsFn = async (): Promise<ApiResponse<Account>> => {
  const token = getAccessToken();
  return accountService.getAccountDetails(token.accountId);
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    isLoading: isLoginLoading,
    error: loginError,
    result: loginResult,
    asyncCallback: login,
  } = useAsync(loginFn);

  const {
    isLoading: isAccountLoading,
    error: accountError,
    result: accountResult,
    asyncCallback: getAccountDetails,
  } = useAsync(getAccountDetailsFn);

  return (
    <AuthContext.Provider
      value={{
        accountError,
        accountResult,
        logout: logoutFn,
        isAccountLoading,
        isLoginLoading,
        isUserAuthenticated,
        getAccountDetails,
        login,
        loginError,
        loginResult,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
