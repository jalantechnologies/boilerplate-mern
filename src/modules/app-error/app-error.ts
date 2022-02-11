export default class AppError extends Error {
  code: string;

  httpStatusCode: number;

  toString(): string {
    return `${this.code}: ${this.message}`;
  }

  toJson(): unknown {
    let errorObj = {};
    errorObj['message'] = this.message;
    Object.entries(this).forEach(([key, value]) => {
      errorObj[key] = value;
    });
    return errorObj;
  }
}
