import AppError from '../error/app-error';

export default class BadRequest extends AppError {
  constructor(message: string) {
    super(message);
    this.httpStatusCode = 400;
  }
}
