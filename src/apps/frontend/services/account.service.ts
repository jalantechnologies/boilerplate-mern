import { AccessToken, ApiResponse } from '../types';
import { Account } from '../types/account';

import APIService from './api.service';

export default class AccountService extends APIService {
  getAccountDetails = async (): Promise<ApiResponse<Account>> => {
    const userAccessToken = JSON.parse(
      localStorage.getItem('access-token'),
    ) as AccessToken;

    return this.apiClient.get(`/accounts/${userAccessToken.accountId}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.token}`,
      },
    });
  };
  getAccounts = async (params: {
    search: string;
    page: number;
    size: number;
  }): Promise<ApiResponse<Account[]>> => {
    const userAccessToken = JSON.parse(
      localStorage.getItem('access-token'),
    ) as AccessToken;

    const response = await this.apiClient.get('/accounts', {
      headers: {
        Authorization: `Bearer ${userAccessToken.token}`,
      },
      params,
    }); 
    const accounts: Account[] = response.data.map(
      (accountData: any) => new Account(accountData),
    );
    return new ApiResponse(accounts, undefined);
  };
}