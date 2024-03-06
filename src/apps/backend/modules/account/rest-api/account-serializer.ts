import { Account } from '../types';

export const serializeAccountAsJSON = (account: Account): unknown => ({
  id: account.id,
  firstName: account.firstName,
  lastName: account?.lastName,
  username: account.username,
});
