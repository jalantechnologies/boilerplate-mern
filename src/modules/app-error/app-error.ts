export default class AppError extends Error {
  code: string;

  httpStatusCode: number;

  toString(): string {
    return `${this.code}: ${this.message}`;
  }

  toJson(): unknown {
    const errorObj: any = {};
    errorObj.message = this.message;
    Object.entries(this).forEach(([key, value]) => {
      /* eslint-disable @typescript-eslint/no-unsafe-assignment */
      errorObj[key] = value;
    });
    return errorObj;
  }
}
