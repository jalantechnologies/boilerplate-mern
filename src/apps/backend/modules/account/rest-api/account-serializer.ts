import { Account } from '../types';

export const serializeAccount = (account: Account): unknown => ({
  id: account.id,
  username: account.username,
});
