import _ from 'lodash';
import mongoose from 'mongoose';

const { ObjectId } = mongoose.mongo;

export class ObjectIdUtils {
  public static checkIfValidId(input: string): boolean {
    return !_.isEmpty(input) && ObjectId.isValid(input);
  }

  public static createNew(): string {
    return new ObjectId().toString();
  }
}
