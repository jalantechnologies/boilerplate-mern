import { ApiError, ApiResponse } from '../types';
import { Account } from '../types/account';
import { JsonObject } from '../types/common-types';
import { getAccessTokenFromStorage } from '../utils/storage-util';

import APIService from './api.service';

export default class AccountService extends APIService {
  getAccountDetails = async (): Promise<ApiResponse<Account>> => {
    const userAccessToken = getAccessTokenFromStorage();

    return this.apiClient.get(`/accounts/${userAccessToken.accountId}`, {
      headers: {
        Authorization: `Bearer ${userAccessToken.token}`,
      },
    });
  };

  getAllActiveAccounts = async (): Promise<ApiResponse<Account[]>> => {
    try {
      const userAccessToken = getAccessTokenFromStorage();

      const response = await this.apiClient.get(`/accounts`, {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      });
      const accounts: Account[] = (response.data as JsonObject[])
      .filter((account) => account.id !== userAccessToken.accountId)
      .map((accountData) => new Account(accountData));
      return new ApiResponse(accounts, undefined);
    } catch (e) {
      return new ApiResponse(
        undefined,
        new ApiError(e.response.data as JsonObject),
      );
    }
  };

  deleteAccount = async (): Promise<ApiResponse<void>> => {
    const userAccessToken = getAccessTokenFromStorage();

    return this.apiClient.delete(`/accounts/${userAccessToken.accountId}`);
  };
}
