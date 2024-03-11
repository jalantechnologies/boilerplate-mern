import { AccessToken, ApiResponse } from '../types';

import APIService from './api.service';

export default class AuthService extends APIService {
  login = async (
    username: string,
    password: string,
  ): Promise<ApiResponse<AccessToken>> => this.apiClient.post('/access-tokens', {
    username,
    password,
  });

  signup = async (
    firstName: string,
    lastName: string,
    username: string,
    password: string,
  ): Promise<ApiResponse<void>> => this.apiClient.post('/accounts', {
    firstName,
    lastName,
    username,
    password,
  });
}
