import { JsonObject } from './common-types';

export class AccessToken {
  accountId: string;
  token: string;

  constructor(json: JsonObject) {
    this.accountId = json.accountId as string;
    this.token = json.token as string;
  }
}

export type ContactNumber = {
  countryCode: string;
  phoneNumber: string;
};

export enum AuthType {
  PhoneNumber = 'PhoneNumber',
}

export enum AuthStatus {
  Failure = 'Failure',
  Pending = 'Pending',
  Success = 'Success',
}
export class AuthRecord {
  authRecordId: string;
  authStatus: AuthStatus;
  authType: AuthType;
  contactNumber: ContactNumber;

  constructor(json: JsonObject) {
    this.authRecordId = json.authRecordId as string;
    this.authStatus = json.authStatus as AuthStatus;
    this.authType = json.authType as AuthType;
    this.contactNumber = json.contactNumber as ContactNumber;
  }
}
