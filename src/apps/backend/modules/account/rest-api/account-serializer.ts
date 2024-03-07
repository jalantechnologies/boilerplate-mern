import { Account } from '../types';

export const serializeAccountAsJSON = (account: Account): unknown => ({
  id: account.id,
  contactNumber: account.contactNumber,
  username: account.username,
});
