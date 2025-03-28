import APIService from 'frontend/services/api.service';
import { ApiResponse } from 'frontend/types';
import { Account } from 'frontend/types/account';
import { getAccessTokenFromStorage } from 'frontend/utils/storage-util';

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
