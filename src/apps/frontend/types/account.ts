import { PhoneNumber } from './auth';
import { JsonObject } from './common-types';

export class Account {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: PhoneNumber;
  username: string;

  constructor(json: JsonObject) {
    this.id = json.id as string;
    this.firstName = json.firstName as string;
    this.lastName = json.lastName as string;
    this.phoneNumber = json.phoneNumber
      ? new PhoneNumber(json.phoneNumber as JsonObject)
      : null;
    this.username = json.username as string;
  }

  displayName(): string {
    return `${this.firstName} ${this.lastName}`.trim();
  }
}
