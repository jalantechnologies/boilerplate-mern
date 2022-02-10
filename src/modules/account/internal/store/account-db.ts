import { Types } from 'mongoose';

export default interface IAccountDB {
  _id: Types.ObjectId;
  active: boolean;
  username: string;
  hashedPassword: string;
}
