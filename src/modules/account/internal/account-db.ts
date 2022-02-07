import { Types } from 'mongoose';

export default interface AccountDB {
  _id: Types.ObjectId;
  active: boolean;
  username: string;
  hashedPassword: string;
}
