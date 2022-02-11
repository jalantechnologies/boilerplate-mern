export default class AppError extends Error {
  code: string;

  httpStatusCode: number;

  toString(): string {
    return `${this.code}: ${this.message}`;
  }

  toJson(): unknown {
    return {
      message: this.message,
    };
  }
}
