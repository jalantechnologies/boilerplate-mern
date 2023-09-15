import { LooseObject } from './types';

export default class AppError extends Error {
  code: string;
  httpStatusCode: number;

  toString(): string {
    return `${this.code}: ${this.message}`;
  }

  toJson(): LooseObject {
    const json: LooseObject = {};
    json.message = this.message;
    Object.entries(this).forEach(([key, value]) => {
      json[key] = value;
    });
    return json;
  }
}
