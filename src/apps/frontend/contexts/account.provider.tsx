import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { AccountService } from '../services';
import { Account, ApiResponse, AsyncError } from '../types';

import useAsync from './async.hook';

type AccountContextType = {
  accountDetails: Account;
  accountError: AsyncError;
  deleteAccount: () => Promise<void>;
  deleteAccountError: AsyncError;
  getAccountDetails: () => Promise<Account>;
  isAccountLoading: boolean;
  isDeleteAccountLoading: boolean;
  getAllActiveAccounts: () => Promise<Account[]>;
  isGetAllActiveAccountsLoading: boolean;
  isGetAllActiveAccountsError: AsyncError;
  allActiveAccounts: Account[];
  allActiveAccountsList: Account[];
  setActiveAccounts: React.Dispatch<React.SetStateAction<Account[]>>;
  handleUserQuery: (q: string) => void;
  activeAccountsToDisplay: Account[];
};

const AccountContext = createContext<AccountContextType | null>(null);

const accountService = new AccountService();

export const useAccountContext = (): AccountContextType =>
  useContext(AccountContext);

const getAccountDetailsFn = async (): Promise<ApiResponse<Account>> =>
  accountService.getAccountDetails();

const deleteAccountFn = async (): Promise<ApiResponse<void>> =>
  accountService.deleteAccount();

export const AccountProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [allActiveAccountsList, setActiveAccounts] = useState<Account[]>([]);
  const [activeAccountsToDisplay, setActiveAccountsToDisplay] = useState<
    Account[]
  >([]);

  const getAllActiveAccountsFn = async (): Promise<ApiResponse<Account[]>> => {
    const response = await accountService.getAllActiveAccounts();
    setActiveAccounts(response.data);
    setActiveAccountsToDisplay(response.data);
    return response;
  };

  const handleUserQuery = (query: string): void => {
    setActiveAccountsToDisplay(
      allActiveAccountsList.filter(
        (item) =>
          item.username.toLowerCase().includes(query.toLowerCase()) ||
          item.displayName().toLowerCase().includes(query.toLowerCase()),
      ),
    );
  };

  const {
    isLoading: isAccountLoading,
    error: accountError,
    result: accountDetails,
    asyncCallback: getAccountDetails,
  } = useAsync(getAccountDetailsFn);

  const {
    isLoading: isGetAllActiveAccountsLoading,
    error: isGetAllActiveAccountsError,
    result: allActiveAccounts,
    asyncCallback: getAllActiveAccounts,
  } = useAsync(getAllActiveAccountsFn);

  const {
    isLoading: isDeleteAccountLoading,
    error: deleteAccountError,
    asyncCallback: deleteAccount,
  } = useAsync(deleteAccountFn);

  return (
    <AccountContext.Provider
      value={{
        accountDetails: new Account({ ...accountDetails }), // creating an instance to access its methods
        accountError,
        deleteAccount,
        deleteAccountError,
        getAccountDetails,
        isAccountLoading,
        isDeleteAccountLoading,
        getAllActiveAccounts,
        isGetAllActiveAccountsLoading,
        isGetAllActiveAccountsError,
        allActiveAccounts,
        allActiveAccountsList,
        setActiveAccounts,
        handleUserQuery,
        activeAccountsToDisplay,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
