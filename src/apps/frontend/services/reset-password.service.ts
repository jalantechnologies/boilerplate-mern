import { ApiResponse } from '../types';

import APIService from './api.service';

export default class ResetPasswordService extends APIService {
  sendForgotPasswordEmail = async (
    username: string,
  ): Promise<ApiResponse<void>> => this.apiClient.post('/password-reset-token', {
    username,
  });

  resetPassword = async (
    accountId: string,
    newPassword: string,
    token: string,
  ): Promise<ApiResponse<void>> => this.apiClient.patch(`/accounts/${accountId}/reset-password`, {
    newPassword,
    token,
  });
}
