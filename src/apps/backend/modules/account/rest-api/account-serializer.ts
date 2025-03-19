import { Account } from 'modules/account';

export const serializeAccountAsJSON = (account: Account): unknown => ({
  id: account.id,
  phoneNumber: account.phoneNumber,
  firstName: account.firstName,
  lastName: account.lastName,
  username: account.username,
});
