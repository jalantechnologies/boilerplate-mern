import AccountService from '../account/account-service';
import AccessTokenWriter from './internal/access-token-writer';
import { AccessToken, CreateAccessTokenParams } from './types';

export default class AccessTokenService {
  public static async createAccessToken(
    params: CreateAccessTokenParams,
  ): Promise<AccessToken> {
    const accountSearchParams = {
      username: params.username,
      password: params.password,
    };
    const account = await AccountService.getAccountByUsernamePassword(
      accountSearchParams,
    );
    return AccessTokenWriter.createAccessToken(account.id);
  }
}
