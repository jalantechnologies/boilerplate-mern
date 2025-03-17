import { PhoneNumber } from "../account";

import AccessTokenService from "./internal/access-token/access-token-service";
import { AccessToken, AccessTokenPayload, VerifyAccessTokenParams } from "./types";

export default class AuthenticationService {
    public static async createAccessTokenByUsernameAndPassword(
        password: string,
        username: string
    ): Promise<AccessToken> {
        return AccessTokenService.createAccessTokenByUsernameAndPassword(
            password, username
        );
    }

    public static async createAccessTokenByPhoneNumber(
        otpCode: string,
        phoneNumber: PhoneNumber
    ): Promise<AccessToken> {
        return AccessTokenService.createAccessTokenByPhoneNumber(
            otpCode, phoneNumber
        );
    }

    public static verifyAccessToken(
        params: VerifyAccessTokenParams
    ): AccessTokenPayload {
        return AccessTokenService.verifyAccessToken(params);
    }
}