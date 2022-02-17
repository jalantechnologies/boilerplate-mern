import {
  CreateAccountParams,
  ValidationError,
  ValidationFailure,
} from '../types';

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

  public static isUsernameValid(
    username: string,
    failures: ValidationFailure[],
  ) {
    if (username.length < 8) {
      failures.push({
        field: 'password',
        message: 'Username must be at least 8 characters.',
      });
    }
  }
  public static isPasswordValid(
    password: string,
    failures: ValidationFailure[],
  ) {
    if (password.length < 8) {
      failures.push({
        field: 'password',
        message: 'Your password must be at least 8 characters.',
      });
    }
    if (password.search(/[a-z]/i) < 0) {
      failures.push({
        field: 'password',
        message: 'Your password must contain at least one letter.',
      });
    }
    if (password.search(/[0-9]/) < 0) {
      failures.push({
        field: 'password',
        message: 'Your password must contain at least one digit.',
      });
    }
  }
}
