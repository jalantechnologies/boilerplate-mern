type LooseObject = { [key: string]: unknown };

export class ApplicationError extends Error {
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
