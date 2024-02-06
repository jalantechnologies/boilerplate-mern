import { Account } from '../types';

export const serializeAccountAsJSON = (account: Account): unknown => ({
  id: account.id,
  username: account.username,
});
