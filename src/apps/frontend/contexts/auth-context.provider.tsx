import React, { createContext, PropsWithChildren, useContext } from 'react';

import { AccessService } from '../services';

interface AuthContextType {
  signUp: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const accessService = new AccessService();

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}): React.ReactElement => {
  const signUp = async (email: string, password: string): Promise<void> => {
    await accessService.signup(email, password);
  };
  return (
    <AuthContext.Provider
      value={
        {signUp}
      }
    >
      {children}
    </AuthContext.Provider>
  );
};
