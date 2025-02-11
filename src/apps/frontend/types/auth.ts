import { JsonObject } from './common-types';

export class AccessToken {
  accountId: string;
  token: string;

  constructor(json: JsonObject) {
    this.accountId = json.accountId as string;
    this.token = json.token as string;
  }
}

export enum KeyboardKeys {
  BACKSPACE = 'Backspace',
}

export enum LoginMethod {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
}

export type LoginProps = {
  currentLoginMethod?: LoginMethod;
  defaultMobileLogin: LoginMethod;
  defaultWebLogin: LoginMethod;
  displayEmailLoginOnMobile: boolean;
  displayPhoneLoginOnWeb: boolean;
  displayRegisterAccount: boolean;
};

export class PhoneNumber {
  countryCode: string;
  phoneNumber: string;

  constructor(json: JsonObject) {
    this.countryCode = json.countryCode as string;
    this.phoneNumber = json.phoneNumber as string;
  }

  displayPhoneNumber(): string {
    return `${this.countryCode} ${this.phoneNumber}`;
  }
}
