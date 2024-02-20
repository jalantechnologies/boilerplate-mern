import React, {
  createContext,
  PropsWithChildren,
  useContext,
} from 'react';

import { AccountService } from '../services';
import {
  Account, ApiResponse, AsyncError,
} from '../types';

import useAsync from './async.hook';

type AccountContextType = {
  accountError: AsyncError;
  accountResult: Account;
  getAccountDetails?: (accountId: string) => Promise<Account>;
};

const AccountContext = createContext<AccountContextType | null>(null);

const accountService = new AccountService();

export const useAccountContext = (): AccountContextType => useContext(AccountContext);

const getAccountDetailsFn = async (
  accountId: string,
): Promise<ApiResponse<Account>> => accountService.getAccountDetails(accountId);

export const AccountProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    error: accountError,
    result: accountResult,
    asyncCallback: getAccountDetails,
  } = useAsync(getAccountDetailsFn);

  return (
    <AccountContext.Provider
      value={{
        getAccountDetails,
        accountError,
        accountResult,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
