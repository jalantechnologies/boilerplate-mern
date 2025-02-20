import { ApiResponse } from '../types';
import { Account } from '../types/account';
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

  deleteAccount = async (): Promise<ApiResponse<void>> => {
    const userAccessToken = getAccessTokenFromStorage();

    return this.apiClient.delete(`/accounts/${userAccessToken.accountId}`);
  };
}
