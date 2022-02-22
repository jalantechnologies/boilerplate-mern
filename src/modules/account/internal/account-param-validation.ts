import zxcvbn from 'zxcvbn';
import {
  CreateAccountParams,
  ValidationError,
  ValidationFailure,
} from '../types';
import emailRegex from '../constants';

export default class AccountParamValidation {
  public static validate(params: CreateAccountParams): void {
    const failures: ValidationFailure[] = [];
    this.isUsernameValid(params.username, failures);
    this.isPasswordValid(params.password, failures);
    if (failures.length) {
      throw new ValidationError(
        'Account cannot be created, please check the params validity.',
        failures,
      );
    }
  }

  public static isUsernameValid(email: string, failures: ValidationFailure[]): void {
    const emailValid = emailRegex.test(String(email).toLowerCase());
    if (!emailValid) {
      failures.push({
        field: 'username',
        message: 'Please specify valid email.',
      });
    }
  }

  public static isPasswordValid(
    password: string,
    failures: ValidationFailure[],
  ): void {
    const passwordStrength = zxcvbn(password);
    /*
    PasswordStrength
    0 too guessable
    1 very guessable
    2 somewhat guessable
    3 safely unguessable
    4 very unguessable:
    PasswordStrength 3 is of medium difficulty and code should throw for less than 3.
    */
    if (passwordStrength.score < 3) {
      passwordStrength.feedback.suggestions.forEach((msg) => {
        failures.push({
          field: 'password',
          message: msg,
        });
      });
    }
  }
}
