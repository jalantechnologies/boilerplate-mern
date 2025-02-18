import { Account } from 'backend/modules/account';
import { AccountDB } from 'backend/modules/account/internal/store/account-db';
import * as bcrypt from 'bcrypt';
import { PhoneNumberUtil } from 'google-libphonenumber';

export default class AccountUtil {
  public static convertAccountDBToAccount(accountDb: AccountDB): Account {
    const account = new Account();
    account.id = accountDb._id.toString();
    account.phoneNumber = accountDb.phoneNumber;
    account.firstName = accountDb.firstName;
    account.lastName = accountDb.lastName;
    account.username = accountDb.username;
    account.hashedPassword = accountDb.hashedPassword;
    return account;
  }

  public static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public static async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public static validatePhoneNumber(phoneNumber: PhoneNumber): void {
    const phoneUtil = <PhoneUtilInterface>(
      (<PhoneUtilInstance>PhoneNumberUtil).getInstance()
    );
    const isValidPhoneNumber = phoneUtil.isValidNumber(
      phoneUtil.parse(phoneNumber.toString()),
    );

    if (!isValidPhoneNumber) {
      throw new OtpRequestError('Please provide a valid phone number.');
    }
  }
}
