import React, {
  createContext,
  PropsWithChildren,
  useContext,
} from 'react';

import { AuthService } from '../services';
import { AccessToken, ApiResponse, AsyncError } from '../types';

import useAsync from './async.hook';

type AuthContextType = {
  isLoginLoading: boolean;
  signIn: (
    username: string,
    password: string,
  ) => Promise<AccessToken>;
  loginError: AsyncError;
  loginResult: AccessToken;
};

const AuthContext = createContext<AuthContextType | null>(null);

const authService = new AuthService();

export const useAuthContext = (): AuthContextType => useContext(AuthContext);

const login = async (
  username: string,
  password: string,
): Promise<ApiResponse<AccessToken>> => {
  const result = await authService.login(username, password);
  if (result.data) {
    localStorage.setItem('access-token', JSON.stringify(result.data));
  }
  return result;
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    isLoading: isLoginLoading,
    error: loginError,
    result: loginResult,
    asyncCallback: signIn,
  } = useAsync(login);

  return (
    <AuthContext.Provider
      value={{
        isLoginLoading,
        signIn,
        loginError,
        loginResult,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
